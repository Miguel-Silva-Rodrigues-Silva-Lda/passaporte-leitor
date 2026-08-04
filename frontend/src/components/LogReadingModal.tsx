import React, { useState, useCallback, memo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Modal, Button } from '../components/ui';
import clsx from 'clsx';
import type { Child } from '../lib/types';
import { TimeInput, MoodSelector, COLORS } from './reading';
import { readingLogsApi } from '../lib/api';
import { formatDate, getDaysAgo } from '../lib/utils';

// ============================================================================
// TYPESCRIPT INTERFACES
// ============================================================================

interface SessionData {
    childBookId?: string;
    selectedBook?: Child['currentBooks'][0];
    date?: string;
    minutes?: number;
    pageEnd?: number;
    mood?: number;
    finishedBook?: boolean;
    // Review fields
    rating?: number;
    favoriteCharacter?: string;
    review?: string;
}

interface StepProps {
    data: SessionData;
    onChange: (data: SessionData) => void;
    onNext: () => void;
    onCancel?: () => void;
    onBack?: () => void;
}

interface Step1Props extends StepProps {
    currentBooks: Child['currentBooks'];
}


interface SuccessProps {
    data: SessionData;
    onClose: () => void;
}

interface LogReadingModalProps {
    isOpen: boolean;
    onClose: () => void;
    child: Child | null;
    currentBooks: Child['currentBooks'];
    onSuccess: () => void;
}

// TimeInput and MoodSelector now imported from './reading'
// ============================================================================
// DATE SELECTOR
// ============================================================================

const DateSelector = memo(({ value, onChange, minDate }: { value: string; onChange: (date: string) => void; minDate?: string }) => {
    const today = new Date().toISOString().split('T')[0];

    // Generate last 3 days, but only include those >= minDate
    const recentDays = Array.from({ length: 3 }, (_, i) => ({
        date: getDaysAgo(i),
        label: i === 0 ? 'Hoje' : i === 1 ? 'Ontem' : formatDate(getDaysAgo(i), { includeWeekday: true }),
        isToday: i === 0,
    })).filter(day => !minDate || day.date >= minDate);

    const [showCustomDate, setShowCustomDate] = useState(false);
    const isRecentDay = recentDays.some(d => d.date === value);

    return (
        <div className="mb-6">
            <label className="flex items-center gap-1 text-sm font-medium mb-3" style={{ color: COLORS.text }}>
                📅 Dia da leitura?
            </label>

            {/* Recent days grid */}
            <div className={`grid gap-2 mb-3`} style={{ gridTemplateColumns: `repeat(${Math.min(recentDays.length + 1, 4)}, 1fr)` }}>
                {recentDays.map((day) => (
                    <button
                        key={day.date}
                        onClick={() => {
                            onChange(day.date);
                            setShowCustomDate(false);
                        }}
                        className={`py-3 px-2 rounded-xl text-center transition-all ${value === day.date && !showCustomDate
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                    >
                        <span className="text-xs font-medium block">{day.label}</span>
                    </button>
                ))}
                <button
                    onClick={() => setShowCustomDate(!showCustomDate)}
                    className={`py-3 px-2 rounded-xl text-center transition-all ${showCustomDate || (!isRecentDay && value)
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                >
                    <span className="text-xs font-medium block">📆 Outra</span>
                </button>
            </div>

            {/* Custom date picker */}
            {showCustomDate && (
                <div className="bg-gray-50 rounded-xl p-3">
                    <input
                        type="date"
                        value={value}
                        min={minDate}
                        max={today}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none"
                        style={{ color: COLORS.text }}
                    />
                    <p className="text-xs text-gray-400 mt-2 text-center">
                        {minDate ? `Desde ${new Date(minDate).toLocaleDateString('pt-PT')} até hoje` : 'Só podes registar leitura até hoje'}
                    </p>
                </div>
            )}
        </div>
    );
});

// ============================================================================
// PAGE UPDATE INPUT
// ============================================================================

const PageUpdateInput = memo(({ currentPage, totalPages, newPage, onChange }: { currentPage?: number; totalPages?: number; newPage: number; onChange: (page: number) => void }) => {
    const progress = totalPages ? Math.round((newPage / totalPages) * 100) : 0;

    return (
        <div className="mb-6">
            <label className="flex items-center gap-1 text-sm font-medium mb-3" style={{ color: COLORS.text }}>
                📄 Em que página estás agora?
            </label>

            <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 flex-1">
                        <span className="text-gray-400 text-sm">Pág.</span>
                        <input
                            type="number"
                            value={newPage || ''}
                            onChange={(e) => onChange(Math.min(parseInt(e.target.value) || 0, totalPages || 9999))}
                            min={currentPage}
                            max={totalPages || 9999}
                            placeholder="0"
                            className="w-20 text-center text-xl font-bold bg-white border-2 border-gray-200 rounded-lg py-2 focus:border-orange-400 focus:outline-none"
                            style={{ color: COLORS.primary }}
                        />
                        {totalPages && (
                            <span className="text-gray-400 text-sm">/ {totalPages}</span>
                        )}
                    </div>

                    {totalPages && (
                        <div className="text-right">
                            <span className="text-2xl font-bold text-orange-500">{progress}%</span>
                        </div>
                    )}
                </div>

                {/* Progress bar */}
                {totalPages && (
                    <div className="mt-3">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-orange-400 rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-400">
                            <span>Início</span>
                            <span>{totalPages - newPage} páginas restantes</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

// ============================================================================
// STEP INDICATOR
// ============================================================================

const StepIndicator = memo(({ currentStep, totalSteps, labels }: { currentStep: number; totalSteps: number; labels: string[] }) => (
    <div className="flex items-center justify-center gap-2 mb-6">
        {Array.from({ length: totalSteps }).map((_, i) => (
            <React.Fragment key={i}>
                <div className="flex flex-col items-center">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i + 1 <= currentStep
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-200 text-gray-400'
                            }`}
                    >
                        {i + 1 < currentStep ? '✓' : i + 1}
                    </div>
                    <span className={`text-xs mt-1 ${i + 1 <= currentStep ? 'text-orange-500' : 'text-gray-400'
                        }`}>
                        {labels[i]}
                    </span>
                </div>
                {i < totalSteps - 1 && (
                    <div
                        className={`w-8 h-1 rounded ${i + 1 < currentStep ? 'bg-orange-500' : 'bg-gray-200'
                            }`}
                    />
                )}
            </React.Fragment>
        ))}
    </div>
));

// ============================================================================
// STEP COMPONENTS
// ============================================================================

// Step 1: Select Book
const Step1SelectBook = ({ data, onChange, onNext, onCancel, currentBooks }: Step1Props) => {
    const hasBooks = currentBooks && currentBooks.length > 0;

    if (!hasBooks) {
        return (
            <div className="text-center py-8">
                <span className="text-6xl mb-4 block">📚</span>
                <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.text }}>
                    Nenhum livro em progresso
                </h3>
                <p className="text-gray-500 mb-6">
                    Adiciona um livro primeiro para registar a leitura.
                </p>
                <Button onClick={onCancel} variant="secondary">
                    Voltar
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center mb-4">
                <h3 className="text-lg font-bold" style={{ color: COLORS.text }}>
                    Que livro leste?
                </h3>
                <p className="text-sm text-gray-500">Seleciona o livro</p>
            </div>

            <div className="space-y-3">
                {currentBooks.map((book) => (
                    <button
                        key={book.id}
                        onClick={() => onChange({ ...data, childBookId: book.id, selectedBook: book })}
                        className={clsx(
                            "w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 text-left",
                            data.childBookId === book.id
                                ? "border-orange-500 bg-orange-50 ring-2 ring-orange-500"
                                : "border-gray-200 hover:border-gray-300"
                        )}
                    >
                        <div
                            className="w-12 h-16 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                            style={{ backgroundColor: '#f0f0f0' }}
                        >
                            📖
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold truncate" style={{ color: COLORS.text }}>
                                {book.title}
                            </h4>
                            <p className="text-sm text-gray-500 truncate">{book.author}</p>
                        </div>
                        {data.childBookId === book.id && (
                            <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-xs">✓</span>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            <div className="flex gap-3 pt-4">
                <Button variant="secondary" onClick={onCancel} className="flex-1">
                    Cancelar
                </Button>
                <Button onClick={onNext} disabled={!data.childBookId} className="flex-1">
                    Continuar →
                </Button>
            </div>
        </div>
    );
};

// Step 2: Select Date
const Step2SelectDate = ({ data, onChange, onNext, onBack }: StepProps) => {
    const book = data.selectedBook;
    // Get startDate from book and format it for the date input
    const bookStartDate = book?.startDate ? new Date(book.startDate).toISOString().split('T')[0] : undefined;

    return (
        <div className="space-y-6">
            <div className="text-center mb-4">
                <h3 className="text-lg font-bold" style={{ color: COLORS.text }}>
                    Quando leste?
                </h3>
            </div>

            {/* Selected book reminder */}
            {book && (
                <div className="bg-gray-50 rounded-xl p-3 mb-4 flex items-center gap-3">
                    <span className="text-2xl">📖</span>
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-sm truncate">{book.title}</p>
                        <p className="text-xs text-gray-500">{book.author}</p>
                    </div>
                </div>
            )}

            <DateSelector
                value={data.date || new Date().toISOString().split('T')[0]}
                onChange={(date) => onChange({ ...data, date })}
                minDate={bookStartDate}
            />

            <div className="flex gap-3 pt-4">
                <Button variant="secondary" onClick={onBack}>
                    ← Voltar
                </Button>
                <Button onClick={onNext} className="flex-1">
                    Continuar →
                </Button>
            </div>
        </div>
    );
};

// Step 3: Reading Session (Time + Mood + Page combined)
const Step3ReadingSession = ({ data, onChange, onNext, onBack, dailyGoal }: StepProps & { dailyGoal: number }) => {
    const book = data.selectedBook;

    return (
        <div className="space-y-6">
            <div className="text-center mb-4">
                <h3 className="text-lg font-bold" style={{ color: COLORS.text }}>
                    Sessão de Leitura
                </h3>
            </div>

            {/* Date and book reminder */}
            {data.date && book && (
                <div className="bg-orange-50 rounded-xl p-3 mb-4 text-center">
                    <span className="text-sm text-orange-700">
                        📅 {formatDate(data.date)} • {book.title}
                    </span>
                </div>
            )}

            {/* Time Input */}
            <TimeInput
                value={data.minutes || dailyGoal}
                onChange={(minutes) => onChange({ ...data, minutes })}
                dailyGoal={dailyGoal}
            />

            {/* Mood Selector */}
            <MoodSelector
                value={data.mood || 3}
                onChange={(mood) => onChange({ ...data, mood })}
            />

            <div className="flex gap-3 pt-4">
                <Button variant="secondary" onClick={onBack}>
                    ← Voltar
                </Button>
                <Button onClick={onNext} disabled={!data.minutes || data.minutes < 1} className="flex-1">
                    Continuar →
                </Button>
            </div>
        </div>
    );
};

// Step 4: Finished Book?
const Step4FinishedBook = ({ data, onChange, onNext, onBack }: StepProps) => {
    const book = data.selectedBook;

    return (
        <div className="space-y-6">
            <div className="text-center mb-4">
                <h3 className="text-lg font-bold" style={{ color: COLORS.text }}>
                    🏁 Acabaste o livro?
                </h3>
            </div>

            {/* Book info */}
            {book && (
                <div className="bg-gray-50 rounded-xl p-4 mb-6 text-center">
                    <p className="font-bold text-gray-800">{book.title}</p>
                    <p className="text-sm text-gray-500">{book.author}</p>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => onChange({ ...data, finishedBook: true })}
                    className={clsx(
                        "p-6 rounded-xl text-center transition-all",
                        data.finishedBook === true
                            ? "bg-green-100 ring-2 ring-green-500"
                            : "bg-gray-100 hover:bg-gray-200"
                    )}
                >
                    <span className="text-4xl block mb-2">🎉</span>
                    <span className="font-bold text-gray-800">Sim, acabei!</span>
                </button>

                <button
                    onClick={() => onChange({ ...data, finishedBook: false })}
                    className={clsx(
                        "p-6 rounded-xl text-center transition-all",
                        data.finishedBook === false
                            ? "bg-orange-100 ring-2 ring-orange-500"
                            : "bg-gray-100 hover:bg-gray-200"
                    )}
                >
                    <span className="text-4xl block mb-2">📖</span>
                    <span className="font-bold text-gray-800">Ainda não</span>
                </button>
            </div>

            {/* Page Progress - only show if book is NOT finished */}
            {data.finishedBook === false && (
                <>
                    <PageUpdateInput
                        currentPage={book?.currentPage}
                        totalPages={book?.totalPages}
                        newPage={data.pageEnd || book?.currentPage || 0}
                        onChange={(page) => onChange({ ...data, pageEnd: page })}
                    />

                    <button
                        onClick={() => onChange({ ...data, pageEnd: undefined })}
                        className="w-full text-sm text-gray-500 hover:text-gray-700"
                    >
                        Não sei / Não quero registar páginas
                    </button>
                </>
            )}

            <div className="flex gap-3 pt-4">
                <Button variant="secondary" onClick={onBack}>
                    ← Voltar
                </Button>
                <Button
                    onClick={onNext}
                    disabled={data.finishedBook === undefined}
                    className="flex-1"
                >
                    {data.finishedBook === false ? '✓ Concluir' : 'Continuar →'}
                </Button>
            </div>
        </div>
    );
};

// Step 5: Book Review (only if finished)
const Step5BookReview = ({ data, onChange, onSubmit, onBack, isLoading }: { data: SessionData; onChange: React.Dispatch<React.SetStateAction<SessionData>>; onSubmit: () => void; onBack: () => void; isLoading: boolean }) => {
    const book = data.selectedBook;

    return (
        <div className="space-y-6">
            <div className="text-center mb-4">
                <h3 className="text-lg font-bold" style={{ color: COLORS.text }}>
                    🎉 Parabéns!
                </h3>
            </div>

            {/* Celebration */}
            <div className="bg-green-50 rounded-xl p-4 mb-6 text-center">
                <span className="text-4xl block mb-2">📚✨</span>
                <p className="font-bold text-green-700">Terminaste "{book?.title}"!</p>
            </div>

            {/* Favorite Character */}
            <div className="mb-4">
                <label className="flex items-center gap-1 text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                    👤 Personagem favorita
                    <span className="text-gray-400 text-xs font-normal">(opcional)</span>
                </label>
                <input
                    type="text"
                    value={data.favoriteCharacter || ''}
                    onChange={(e) => onChange({ ...data, favoriteCharacter: e.target.value })}
                    placeholder="Ex: O Raposo"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none"
                    style={{ color: COLORS.text }}
                />
            </div>

            {/* Review */}
            <div className="mb-4">
                <label className="flex items-center gap-1 text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                    📝 O que achaste do livro?
                    <span className="text-gray-400 text-xs font-normal">(opcional)</span>
                </label>
                <textarea
                    value={data.review || ''}
                    onChange={(e) => onChange({ ...data, review: e.target.value })}
                    placeholder="O que mais gostaste? O que aprendeste?"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none resize-none"
                    style={{ color: COLORS.text }}
                />
            </div>

            {/* Star Rating */}
            <div className="mb-4">
                <label className="flex items-center gap-1 text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                    ⭐ Gostaste?
                </label>
                <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => onChange({ ...data, rating: star })}
                            className={`text-4xl transition-all ${star <= (data.rating || 0) ? 'scale-110' : 'grayscale opacity-40'
                                }`}
                        >
                            ⭐
                        </button>
                    ))}
                </div>
                {(!data.rating || data.rating === 0) && (
                    <p className="text-red-500 text-xs text-center mt-2">Dá uma classificação ao livro</p>
                )}
            </div>

            <div className="flex gap-3 pt-4">
                <Button variant="secondary" onClick={onBack}>
                    ← Voltar
                </Button>
                <Button
                    onClick={onSubmit}
                    disabled={!data.rating || data.rating === 0 || isLoading}
                    className="flex-1"
                >
                    {isLoading ? 'A Guardar...' : '✓ Concluir'}
                </Button>
            </div>
        </div>
    );
};

// Success Screen
const SuccessScreen = ({ data, onClose }: SuccessProps) => {
    return (
        <div className="text-center py-8">
            <div className="text-6xl mb-6 animate-bounce">
                {data.finishedBook ? '🏆' : '✅'}
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.text }}>
                {data.finishedBook ? 'Livro Terminado!' : 'Sessão Registada!'}
            </h2>
            <p className="text-gray-500 mb-2">
                {data.minutes} minutos de leitura
            </p>
            {data.finishedBook && (
                <p className="text-green-600 font-bold mb-6">
                    🎉 Parabéns por terminares "{data.selectedBook?.title}"!
                </p>
            )}

            <div className="flex justify-center">
                <Button onClick={onClose} className="w-full max-w-xs">
                    Voltar ao Passaporte
                </Button>
            </div>
        </div>
    );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function LogReadingModal({ isOpen, onClose, child, currentBooks, onSuccess }: LogReadingModalProps) {
    const [step, setStep] = useState(1);
    const [sessionData, setSessionData] = useState<SessionData>({
        date: new Date().toISOString().split('T')[0],
        minutes: 15,
        mood: 3
    });

    const createSessionMutation = useMutation({
        mutationFn: async () => {
            if (!child?.id || !sessionData.childBookId || !sessionData.minutes) {
                throw new Error('Missing required data');
            }

            return readingLogsApi.create({
                childBookId: sessionData.childBookId,
                minutes: sessionData.minutes,
                pageEnd: sessionData.pageEnd,
                mood: sessionData.mood,
                finishedBook: sessionData.finishedBook || false,
                date: sessionData.date,
                ...(sessionData.finishedBook && {
                    rating: sessionData.rating,
                    favoriteCharacter: sessionData.favoriteCharacter,
                    notes: sessionData.review,
                }),
            });
        }
    });

    const handleClose = useCallback(() => {
        setStep(1);
        setSessionData({
            date: new Date().toISOString().split('T')[0],
            minutes: 15,
            mood: 3
        });
        onClose();
    }, [onClose]);

    const handleSubmit = useCallback(async () => {
        if (!child || !sessionData.childBookId) return;

        try {
            await createSessionMutation.mutateAsync();
            setStep(sessionData.finishedBook ? 6 : 5);
            onSuccess();
        } catch (err) {
            console.error(err);
        }
    }, [child, sessionData.childBookId, sessionData.finishedBook, createSessionMutation, onSuccess]);

    // Memoized step navigation callbacks
    const goToStep = useCallback((s: number) => setStep(s), []);
    const goToStep1 = useCallback(() => setStep(1), []);
    const goToStep2 = useCallback(() => setStep(2), []);
    const goToStep3 = useCallback(() => setStep(3), []);
    const goToStep4 = useCallback(() => setStep(4), []);

    if (!isOpen) return null;

    const getTotalSteps = () => sessionData.finishedBook ? 5 : 4;
    const getStepLabels = () => {
        const base = ['Livro', 'Data', 'Sessão', 'Acabou?'];
        if (sessionData.finishedBook) return [...base, 'Review'];
        return base;
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={<span>📝 Registar Leitura</span>}
            variant="white"
        >
            {step < (sessionData.finishedBook ? 6 : 5) && (
                <StepIndicator
                    currentStep={step}
                    totalSteps={getTotalSteps()}
                    labels={getStepLabels()}
                />
            )}

            {step === 1 && (
                <Step1SelectBook
                    data={sessionData}
                    onChange={setSessionData}
                    onNext={goToStep2}
                    onCancel={handleClose}
                    currentBooks={currentBooks}
                />
            )}

            {step === 2 && (
                <Step2SelectDate
                    data={sessionData}
                    onChange={setSessionData}
                    onNext={goToStep3}
                    onBack={goToStep1}
                />
            )}

            {step === 3 && (
                <Step3ReadingSession
                    data={sessionData}
                    onChange={setSessionData}
                    onNext={goToStep4}
                    onBack={goToStep2}
                    dailyGoal={child?.dailyGoal || 15}
                />
            )}

            {step === 4 && (
                <Step4FinishedBook
                    data={sessionData}
                    onChange={setSessionData}
                    onNext={() => {
                        if (sessionData.finishedBook) {
                            goToStep(5);
                        } else {
                            handleSubmit();
                        }
                    }}
                    onBack={goToStep3}
                />
            )}

            {step === 5 && sessionData.finishedBook && (
                <Step5BookReview
                    data={sessionData}
                    onChange={setSessionData}
                    onSubmit={handleSubmit}
                    onBack={() => {
                        setSessionData(prev => ({ ...prev, finishedBook: undefined }));
                        goToStep4();
                    }}
                    isLoading={createSessionMutation.isPending}
                />
            )}

            {step === 5 && !sessionData.finishedBook && (
                <SuccessScreen
                    data={sessionData}
                    onClose={handleClose}
                />
            )}

            {step === 6 && (
                <SuccessScreen
                    data={sessionData}
                    onClose={handleClose}
                />
            )}
        </Modal>
    );
}

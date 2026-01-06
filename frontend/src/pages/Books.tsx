import { useState, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { booksApi, childrenApi, type ChildListItem } from '../lib/api';
import { useFamilyId } from '../lib/store';
import type { Book } from '../lib/types';
import { GENRES, BOOK_STATUS_CONFIG } from '../lib/types';
import { Modal } from '../components/ui';
import { ChildSelector } from '../components/ChildSelector';
import { COLORS } from '../lib/constants';

// Extend shared config with page-specific styling
export const STATUS_CONFIG = {
  'reading': { ...BOOK_STATUS_CONFIG.reading, color: COLORS.secondary, bgColor: `${COLORS.secondary}20` },
  'to-read': { ...BOOK_STATUS_CONFIG['to-read'], color: COLORS.textLight, bgColor: '#f3f4f6' },
  'finished': { ...BOOK_STATUS_CONFIG.finished, color: COLORS.success, bgColor: `${COLORS.success}20` },
} as const;

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

type StatusFilter = 'all' | 'reading' | 'to-read' | 'finished';
type GenreFilter = 'all' | keyof typeof GENRES;
type ChildFilter = 'all' | string;
type SortBy = 'recent' | 'title' | 'rating' | 'progress';

interface FilterCounts {
  total: number;
  READING: number;
  TO_READ: number;
  FINISHED: number;
}

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

interface FilterTabsProps {
  activeFilter: StatusFilter;
  onChange: (filter: StatusFilter) => void;
  counts: FilterCounts;
}

interface GenreFilterProps {
  activeGenre: GenreFilter;
  onChange: (genre: GenreFilter) => void;
}

interface SortDropdownProps {
  value: SortBy;
  onChange: (value: SortBy) => void;
}

interface CompactBookCardProps {
  book: Book;
  onClick: () => void;
  showChild: boolean;
  children?: ChildListItem[];
}

interface BookDetailModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

interface EmptyStateProps {
  filter: StatusFilter;
  isSearch: boolean;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ITEMS_PER_PAGE = 10;

// ============================================================================
// SEARCH BAR
// ============================================================================

const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Procurar livro ou autor..."
      className="w-full pl-9 pr-9 py-2.5 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none text-sm"
      style={{ color: COLORS.text }}
    />
    {value && (
      <button
        onClick={() => onChange('')}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-300 text-xs"
      >
        ✕
      </button>
    )}
  </div>
);

// ============================================================================
// FILTER TABS
// ============================================================================

const FilterTabs = ({ activeFilter, onChange, counts }: FilterTabsProps) => {
  const filters = [
    { id: 'all' as const, label: 'Todos', icon: '📚' },
    { id: 'reading' as const, label: STATUS_CONFIG.reading.label, icon: STATUS_CONFIG.reading.icon },
    { id: 'to-read' as const, label: STATUS_CONFIG['to-read'].label, icon: STATUS_CONFIG['to-read'].icon },
    { id: 'finished' as const, label: 'Terminados', icon: STATUS_CONFIG.finished.icon },
  ];

  return (
    <div className="flex gap-1 overflow-x-auto pb-2 -mx-2 px-2">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        const count = filter.id === 'all' ? counts.total :
          filter.id === 'reading' ? counts.READING :
            filter.id === 'to-read' ? counts.TO_READ : counts.FINISHED;

        return (
          <button
            key={filter.id}
            onClick={() => onChange(filter.id)}
            className={`flex items-center gap-1 px-2 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${isActive ? 'shadow-md scale-105' : 'opacity-70 hover:opacity-100'
              }`}
            style={{
              backgroundColor: isActive ? COLORS.primary : '#f3f4f6',
              color: isActive ? 'white' : COLORS.text,
            }}
          >
            <span className="text-xs">{filter.icon}</span>
            <span>{filter.label}</span>
            <span className={`text-xs px-1 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-gray-200'}`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

// ============================================================================
// GENRE FILTER (Dropdown)
// ============================================================================

const GenreFilter = ({ activeGenre, onChange }: GenreFilterProps) => {
  const genres = [
    { id: 'all' as const, name: 'Todos os géneros', icon: '🌍', color: COLORS.primary },
    ...Object.entries(GENRES).map(([id, g]) => ({ id: id as keyof typeof GENRES, ...g }))
  ];

  return (
    <select
      value={activeGenre}
      onChange={(e) => onChange(e.target.value as GenreFilter)}
      className="flex-1 px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none bg-white text-sm font-medium"
      style={{ color: COLORS.text }}
    >
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.icon} {genre.name}
        </option>
      ))}
    </select>
  );
};

// ============================================================================
// SORT DROPDOWN
// ============================================================================

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  const options: { id: SortBy; label: string }[] = [
    { id: 'recent', label: 'Recentes' },
    { id: 'title', label: 'Título (A-Z)' },
    { id: 'rating', label: 'Avaliação' },
    { id: 'progress', label: 'Progresso' },
  ];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortBy)}
      className="px-3 py-2 rounded-lg border-2 border-gray-200 text-sm font-medium focus:outline-none focus:border-orange-400"
      style={{ color: COLORS.text }}
    >
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>{opt.label}</option>
      ))}
    </select>
  );
};

// ============================================================================
// COMPACT BOOK CARD
// ============================================================================

const CompactBookCard = ({ book, onClick, showChild, children }: CompactBookCardProps) => {
  const genre = GENRES[book.genre as keyof typeof GENRES];
  const progress = book.totalPages && book.currentPage
    ? Math.round((book.currentPage / book.totalPages) * 100)
    : null;

  const bookChild = showChild ? children?.find(c => c.id === book.childId) : null;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-2 cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] active:scale-100 border"
      style={{ borderColor: COLORS.border }}
    >
      <div className="flex items-start justify-between mb-1">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
          style={{ backgroundColor: `${genre?.color}15` }}
        >
          {genre?.icon}
        </div>

        {book.status === 'reading' && progress !== null && (
          <span
            className="text-xs font-bold px-1 py-0.5 rounded-full"
            style={{ backgroundColor: `${genre?.color}15`, color: genre?.color }}
          >
            {progress}%
          </span>
        )}
        {book.status === 'finished' && book.rating && (
          <span className="text-xs">{'⭐'.repeat(book.rating)}</span>
        )}
        {book.status === 'to-read' && book.totalPages && (
          <span className="text-xs text-gray-400">{book.totalPages}p</span>
        )}
      </div>

      <h4
        className="font-semibold text-xs leading-tight line-clamp-2 mb-0.5"
        style={{ color: COLORS.text }}
      >
        {book.title}
      </h4>

      <p className="text-xs text-gray-400 truncate">{book.author}</p>

      {bookChild && (
        <div className="flex items-center gap-0.5 mt-1 text-xs text-gray-400">
          <span className="text-xs">{bookChild.avatar}</span>
          <span>{bookChild.name}</span>
        </div>
      )}

      {book.status === 'reading' && progress !== null && (
        <div className="mt-1 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${progress}%`, backgroundColor: genre?.color }}
          />
        </div>
      )}
    </div>
  );
};

// ============================================================================
// BOOK DETAIL MODAL
// ============================================================================

const BookDetailModal = ({ book, isOpen, onClose }: BookDetailModalProps) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Editable fields state
  const [editTitle, setEditTitle] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [editGenre, setEditGenre] = useState<keyof typeof GENRES>('ADVENTURE');
  const [editStartDate, setEditStartDate] = useState('');
  const [editTotalPages, setEditTotalPages] = useState('');
  const [errors, setErrors] = useState<any>({});

  // Sync state with book prop whenever it changes
  useEffect(() => {
    if (book) {
      setEditTitle(book.title || '');
      setEditAuthor(book.author || '');
      setEditGenre((book.genre as keyof typeof GENRES) || 'ADVENTURE');
      setEditStartDate(book.startDate || '');
      setEditTotalPages(book.totalPages?.toString() || '');
      setErrors({});
      setIsEditing(false);
      setShowDeleteConfirm(false);
    }
  }, [book]);

  // Update mutations
  const updateBookMutation = useMutation({
    mutationFn: (data: any) => booksApi.update(book!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['childBooks'] });
      queryClient.invalidateQueries({ queryKey: ['familyStats'] });
      setIsEditing(false);
      onClose();
    },
  });

  const deleteBookMutation = useMutation({
    mutationFn: () => booksApi.delete(book!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['childBooks'] });
      queryClient.invalidateQueries({ queryKey: ['children'] });
      queryClient.invalidateQueries({ queryKey: ['familyStats'] });
      onClose();
    },
  });

  const handleSave = () => {
    const newErrors: any = {};
    if (!editTitle.trim()) newErrors.title = 'Título é obrigatório';
    if (!editAuthor.trim()) newErrors.author = 'Autor é obrigatório';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateBookMutation.mutate({
      title: editTitle,
      author: editAuthor,
      genre: editGenre,
      startDate: editStartDate || undefined,
      totalPages: editTotalPages ? parseInt(editTotalPages) : undefined,
    });
  };

  const handleCancel = () => {
    setEditTitle(book?.title || '');
    setEditAuthor(book?.author || '');
    setEditGenre((book?.genre as keyof typeof GENRES) || 'ADVENTURE');
    setEditStartDate(book?.startDate || '');
    setEditTotalPages(book?.totalPages?.toString() || '');
    setErrors({});
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteBookMutation.mutate();
  };

  if (!book) return null;

  const genre = GENRES[book.genre as keyof typeof GENRES];
  const status = STATUS_CONFIG[book.status];
  const progress = book.totalPages && book.currentPage
    ? Math.round((book.currentPage / book.totalPages) * 100)
    : null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? "Editar Livro" : "Detalhes do Livro"} variant="white">
      <div className="flex gap-4 mb-6">
        <div
          className="w-20 h-28 rounded-xl flex items-center justify-center text-4xl shadow-lg flex-shrink-0"
          style={{ backgroundColor: `${genre?.color}20` }}
        >
          {genre?.icon}
        </div>
        <div className="flex-1">
          {isEditing ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Título do livro"
                className={`w-full text-xl font-bold mb-2 px-3 py-2 rounded-lg border-2 ${errors.title ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-orange-400`}
                style={{ color: COLORS.text }}
              />
              {errors.title && <p className="text-xs text-red-500 mb-2">{errors.title}</p>}

              <input
                type="text"
                value={editAuthor}
                onChange={(e) => setEditAuthor(e.target.value)}
                placeholder="Autor"
                className={`w-full text-gray-500 mb-2 px-3 py-2 rounded-lg border-2 ${errors.author ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-orange-400`}
              />
              {errors.author && <p className="text-xs text-red-500 mb-2">{errors.author}</p>}

              <div className="flex flex-wrap gap-2 mb-2">
                <select
                  value={editGenre}
                  onChange={(e) => setEditGenre(e.target.value as keyof typeof GENRES)}
                  className="text-xs px-3 py-2 rounded-full border-2 border-gray-200 focus:outline-none focus:border-orange-400"
                  style={{ color: GENRES[editGenre]?.color }}
                >
                  {Object.entries(GENRES).map(([key, g]) => (
                    <option key={key} value={key}>{g.icon} {g.name}</option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold mb-1" style={{ color: COLORS.text }}>
                {book.title}
              </h3>
              <p className="text-gray-500 mb-2">{book.author}</p>

              <div className="flex flex-wrap gap-2">
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ backgroundColor: status.bgColor, color: status.color }}
                >
                  {status.icon} {status.label}
                </span>
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ backgroundColor: `${genre?.color}20`, color: genre?.color }}
                >
                  {genre?.icon} {genre?.name}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {book.status === 'reading' && !isEditing && (
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <p className="text-sm font-medium mb-2" style={{ color: COLORS.text }}>Progresso</p>
          {progress !== null ? (
            <>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${progress}%`, backgroundColor: genre?.color }}
                  />
                </div>
                <span className="font-bold" style={{ color: genre?.color }}>{progress}%</span>
              </div>
              <p className="text-sm text-gray-500">
                Página {book.currentPage} de {book.totalPages}
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-500">Página {book.currentPage || '?'}</p>
          )}
        </div>
      )}

      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        {isEditing ? (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Início</p>
              <input
                type="date"
                value={editStartDate ? new Date(editStartDate).toISOString().split('T')[0] : ''}
                onChange={(e) => setEditStartDate(e.target.value ? new Date(e.target.value).toISOString() : '')}
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-orange-400"
              />
            </div>
            <div>
              <p className="text-gray-500 mb-1">Páginas</p>
              <input
                type="number"
                value={editTotalPages}
                onChange={(e) => setEditTotalPages(e.target.value)}
                placeholder="Total de páginas"
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-orange-400"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 text-sm">
            {book.startDate && (
              <div>
                <p className="text-gray-500">Início</p>
                <p className="font-medium" style={{ color: COLORS.text }}>
                  {new Date(book.startDate).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            )}
            {book.finishDate && (
              <div>
                <p className="text-gray-500">Fim</p>
                <p className="font-medium" style={{ color: COLORS.text }}>
                  {new Date(book.finishDate).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            )}
            {book.totalPages && (
              <div>
                <p className="text-gray-500">Páginas</p>
                <p className="font-medium" style={{ color: COLORS.text }}>{book.totalPages}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {book.status === 'finished' && book.rating && !isEditing && (
        <div className="bg-green-50 rounded-xl p-4 mb-4">
          <p className="text-sm font-medium mb-2" style={{ color: COLORS.text }}>Avaliação</p>

          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-2xl">
                {i < book.rating! ? '⭐' : '☆'}
              </span>
            ))}
          </div>

          {book.favoriteCharacter && (
            <div className="mb-2">
              <p className="text-sm text-gray-500">Personagem favorita</p>
              <p className="font-medium" style={{ color: COLORS.text }}>{book.favoriteCharacter}</p>
            </div>
          )}

          {book.notes && (
            <div className="mb-2">
              <p className="text-sm text-gray-500">O que achei</p>
              <p className="text-sm" style={{ color: COLORS.text }}>"{book.notes}"</p>
            </div>
          )}

        </div>
      )}

      {/* Action Buttons */}
      {!isEditing && !showDeleteConfirm && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setIsEditing(true)}
            className="flex-1 px-4 py-3 rounded-xl font-bold border-2 border-orange-500 text-orange-500 hover:bg-orange-50 transition-all"
          >
            ✏️ Editar
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-3 rounded-xl font-bold border-2 border-red-500 text-red-500 hover:bg-red-50 transition-all"
          >
            🗑️ Remover
          </button>
        </div>
      )}

      {/* Edit Mode Buttons */}
      {isEditing && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-3 rounded-xl font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={updateBookMutation.isPending}
            className="flex-1 px-4 py-3 rounded-xl font-bold bg-orange-500 text-white hover:bg-orange-600 transition-all disabled:opacity-50"
          >
            {updateBookMutation.isPending ? 'A guardar...' : '💾 Guardar'}
          </button>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && !isEditing && (
        <div className="bg-red-50 p-4 rounded-xl mt-4">
          <p className="text-sm text-red-700 mb-3 text-center font-medium">
            Tens a certeza? Este livro e todos os seus registos serão removidos.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="flex-1 px-4 py-2 rounded-xl font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteBookMutation.isPending}
              className="flex-1 px-4 py-2 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 transition-all disabled:opacity-50"
            >
              {deleteBookMutation.isPending ? 'A remover...' : 'Confirmar'}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

// ============================================================================
// PAGINATION
// ============================================================================

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: (number | 'ellipsis')[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push('ellipsis');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push('ellipsis');

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1 py-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
        style={{ color: COLORS.text }}
      >
        ←
      </button>

      {getVisiblePages().map((page, i) =>
        page === 'ellipsis' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-gray-400">...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
              currentPage === page
                ? 'shadow-md scale-105'
                : 'hover:bg-gray-100'
            }`}
            style={{
              backgroundColor: currentPage === page ? COLORS.primary : 'transparent',
              color: currentPage === page ? 'white' : COLORS.text,
            }}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
        style={{ color: COLORS.text }}
      >
        →
      </button>
    </div>
  );
};

// ============================================================================
// EMPTY STATE
// ============================================================================

const EmptyState = ({ filter, isSearch }: EmptyStateProps) => {
  if (isSearch) {
    return (
      <div className="text-center py-12">
        <span className="text-5xl block mb-4">🔍</span>
        <h3 className="text-lg font-bold mb-2" style={{ color: COLORS.text }}>
          Nenhum livro encontrado
        </h3>
        <p className="text-gray-500">Tenta outro título ou autor</p>
      </div>
    );
  }

  const messages = {
    all: { icon: '📚', title: 'Nenhum livro ainda', subtitle: 'Adiciona o teu primeiro livro!' },
    reading: { icon: '📖', title: 'Nenhum livro a ler', subtitle: 'Começa uma nova aventura!' },
    'to-read': { icon: '📋', title: 'Lista de leitura vazia', subtitle: 'Adiciona livros que queres ler.' },
    finished: { icon: '🏆', title: 'Ainda sem livros terminados', subtitle: 'Continua a ler para desbloquear!' },
  };

  const msg = messages[filter] || messages.all;

  return (
    <div className="text-center py-12">
      <span className="text-6xl block mb-4">{msg.icon}</span>
      <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.text }}>{msg.title}</h3>
      <p className="text-gray-500 mb-6">{msg.subtitle}</p>
    </div>
  );
};

// ============================================================================
// MAIN BOOKS PAGE
// ============================================================================

export default function BooksPage() {
  const familyId = useFamilyId();
  const [selectedChildId, setSelectedChildId] = useState<ChildFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [genreFilter, setGenreFilter] = useState<GenreFilter>('all');
  const [sortBy, setSortBy] = useState<SortBy>('recent');
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedChildId, statusFilter, genreFilter, search, sortBy]);

  const { data: children = [] } = useQuery({
    queryKey: ['children-list', familyId],
    queryFn: () => childrenApi.getList(familyId!),
    enabled: !!familyId,
  });

  const { data: booksData } = useQuery({
    queryKey: ['books', familyId, selectedChildId, statusFilter, genreFilter, search, sortBy, currentPage],
    queryFn: () => booksApi.getByFamily(familyId!, {
      status: statusFilter !== 'all' ? statusFilter : undefined,
      genre: genreFilter !== 'all' ? genreFilter : undefined,
      childId: selectedChildId !== 'all' ? selectedChildId : undefined,
      search: search || undefined,
      sortBy,
      limit: ITEMS_PER_PAGE,
      offset: (currentPage - 1) * ITEMS_PER_PAGE,
    }),
    enabled: !!familyId,
  });

  const books = booksData?.books ?? [];
  const apiCounts = booksData?.counts ?? { reading: 0, 'to-read': 0, finished: 0 };
  const totalBooks = apiCounts.reading + apiCounts['to-read'] + apiCounts.finished;

  // Calculate total pages based on current status filter
  const filteredTotal = statusFilter === 'all'
    ? totalBooks
    : apiCounts[statusFilter];
  const totalPages = Math.ceil(filteredTotal / ITEMS_PER_PAGE);

  // Use counts from API
  const counts: FilterCounts = {
    total: totalBooks,
    READING: apiCounts.reading,
    TO_READ: apiCounts['to-read'],
    FINISHED: apiCounts.finished,
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
      <div className="bg-white border-b sticky top-0 z-10" style={{ borderColor: COLORS.border }}>
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold" style={{ color: COLORS.text }}>
              📚 Livros
            </h1>
          </div>

          {children.length > 1 && (
            <div className="mb-3">
              <ChildSelector
                children={children}
                selectedId={selectedChildId}
                onChange={setSelectedChildId}
              />
            </div>
          )}

          <div className="mb-3">
            <SearchBar value={search} onChange={setSearch} />
          </div>

          <FilterTabs
            activeFilter={statusFilter}
            onChange={setStatusFilter}
            counts={counts}
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="flex gap-3">
          <GenreFilter activeGenre={genreFilter} onChange={setGenreFilter} />
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {search && (
        <div className="max-w-2xl mx-auto px-4 pb-2">
          <p className="text-sm text-gray-500">
            {totalBooks} resultado{totalBooks !== 1 ? 's' : ''} para "<span className="font-medium">{search}</span>"
          </p>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 pb-3">
        {books.length === 0 ? (
          <EmptyState filter={statusFilter} isSearch={!!search} />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2">
              {books.map((book) => (
                <CompactBookCard
                  key={book.id}
                  book={book}
                  onClick={() => setSelectedBook(book)}
                  showChild={selectedChildId === 'all'}
                  children={children}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      <BookDetailModal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </div>
  );
}

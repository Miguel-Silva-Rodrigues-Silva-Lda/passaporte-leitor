import { Component, ReactNode } from 'react';
import { COLORS } from '../lib/constants';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
                    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
                        <div className="text-6xl mb-4">📚</div>
                        <h1 className="text-2xl font-bold mb-2" style={{ color: COLORS.text }}>
                            Oops! Algo correu mal
                        </h1>
                        <p className="text-gray-500 mb-6">
                            Ocorreu um erro inesperado. Por favor, tenta recarregar a pagina.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={this.handleGoHome}
                                className="px-6 py-3 rounded-xl font-medium transition-all"
                                style={{
                                    backgroundColor: '#f3f4f6',
                                    color: COLORS.text
                                }}
                            >
                                Inicio
                            </button>
                            <button
                                onClick={this.handleReload}
                                className="px-6 py-3 rounded-xl font-medium text-white transition-all"
                                style={{ backgroundColor: COLORS.primary }}
                            >
                                Recarregar
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

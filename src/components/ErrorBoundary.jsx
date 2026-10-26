import React from 'react'
import { RotateCcw, AlertTriangle } from 'lucide-react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.hash = '#/'
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#c4c3b6] text-[#000000] text-center font-sans">
          <div className="bg-[#ffffff] p-8 sm:p-12 rounded-3xl border border-black/10 shadow-xl max-w-lg w-full">
            <div className="w-14 h-14 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto mb-5">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h2 className="font-serif text-3xl font-normal text-[#000000] mb-3">
              Notice in Gallery Exhibition
            </h2>
            <p className="text-xs text-[#595855] leading-relaxed mb-6">
              A temporary display glitch occurred while rendering this section. You can return directly to the main exhibition.
            </p>
            {this.state.error && (
              <pre className="text-[10px] font-mono text-start p-3 bg-red-50 text-red-900 rounded-xl overflow-x-auto mb-6 max-h-32">
                {this.state.error.toString()}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#000000] text-[#ffffff] text-xs font-medium hover:bg-[#595855] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Return to Exhibition</span>
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

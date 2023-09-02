import type { ErrorInfo, ReactNode } from 'react'
import { Component } from 'react'

import { Result } from 'antd'

import 'antd/lib/result/style/css'
import './errorBoundary.scss'
import { Button } from 'components/ui/Button/Button'

interface IProps {
  children: ReactNode
}

interface IState {
  hasError: boolean
}

export class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo)
  }

  handleReloadPage() {
    window.location.reload()
  }

  render() {
    const { children } = this.props
    const { hasError } = this.state

    if (hasError) {
      return (
        <Result
          status='500'
          title='Error'
          subTitle='Sorry, something went wrong please reload page and try again.'
          extra={<Button onClick={this.handleReloadPage}>Reload</Button>}
        />
      )
    }

    return children
  }
}

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Bounce, toast } from "react-toastify";
import { AxiosError } from "axios";

const notify = (message: string) =>
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (error instanceof AxiosError) {
      setTimeout(() => notify(error.message), 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;

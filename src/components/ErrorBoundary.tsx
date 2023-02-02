import React from "react";

interface IState {
  hasError: boolean;
}

interface IProps {
  fallback?: React.ReactNode;
  children?: React.ReactNode;
}

export default class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // componentDidCatch(error, errorInfo) {
  //   // You can also log the error to an error reporting service
  //   logErrorToMyService(error, errorInfo);
  // }

  render() {
    const {
      state,
      props: { children, fallback },
    } = this;
    if (state.hasError) {
      // You can render any custom fallback UI
      return fallback;
    }

    return children;
  }
}

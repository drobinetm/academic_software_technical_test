import React, { useMemo, useState } from 'react';
import { FeedbackContext } from './FeedbackContext';

const initialFeedback = {
  open: false,
  severity: 'info',
  message: '',
};

export function FeedbackProvider({ children }) {
  const [feedback, setFeedback] = useState(initialFeedback);

  const showFeedback = ({ message, severity = 'info' }) => {
    setFeedback({
      open: true,
      severity,
      message,
    });
  };

  const closeFeedback = () => {
    setFeedback((current) => ({
      ...current,
      open: false,
    }));
  };

  const value = useMemo(
    () => ({
      feedback,
      showFeedback,
      closeFeedback,
    }),
    [feedback]
  );

  return <FeedbackContext.Provider value={value}>{children}</FeedbackContext.Provider>;
}

import { useState, useEffect } from "react";
import "./App.css";
import { Description } from "./Description/Description";
import Options from "./Options/Options";
import Feedback from "./Feedback/Feedback";
import Notification from "./Notification/Notification";

const App = () => {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = window.localStorage.getItem("saved-reviews");
    try {
      if (savedReviews !== null) {
        return JSON.parse(savedReviews);
      }
    } catch (error) {
      console.error(error);
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

  useEffect(() => {
    window.localStorage.setItem("saved-reviews", JSON.stringify(reviews));
  }, [reviews]);

  const updateFeedback = (feedbackType) => {
    setReviews((prev) => ({
      ...prev,
      [feedbackType]: prev[feedbackType] + 1,
    }));
  };

  const totalFeedback = reviews.good + reviews.neutral + reviews.bad;

  const resetFeedback = () => {
    setReviews({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const positiveFeedback =
    totalFeedback > 0 ? Math.round((reviews.good / totalFeedback) * 100) : 0;

  return (
    <div>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          good={reviews.good}
          neutral={reviews.neutral}
          bad={reviews.bad}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
};

export default App;

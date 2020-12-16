import { useState } from 'react';
import Section from './Section';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Notification from './Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleAddFeedback = e => {
    const { name } = e.target;
    switch (name) {
      case 'good':
        setGood(value => value + 1);
        break;

      case 'neutral':
        setNeutral(value => value + 1);
        break;

      case 'bad':
        setBad(value => value + 1);
        break;

      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    const total = good + neutral + bad;

    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / countTotalFeedback()) * 100 || 0);
  };

  const isShowStatistics = countTotalFeedback() > 0;

  return (
    <>
      <Section title={'Please leave feedback'}>
        <FeedbackOptions
          onLeaveFeedback={handleAddFeedback}
          options={['good', 'neutral', 'bad']}
        />
      </Section>

      <Section title="Statistics">
        {isShowStatistics && (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
        {!isShowStatistics && <Notification message="No feedback given" />}
      </Section>
    </>
  );
}

import { useTranslation } from "react-i18next";

const UpcomingTasks = () => {
  const {t} = useTranslation();
  const tasks = [
    { time: '2:00 PM', task: '💊 Take Medicine', type: 'medicine', urgent: true },
    { time: '3:30 PM', task: '📞 Call Doctor', type: 'call', urgent: false },
    { time: '6:00 PM', task: '🧘 Evening Yoga', type: 'yoga', urgent: false },
  ];

  return (
    <div className="mx-4 mb-6">
      <h2 className="text-xl font-bold text-zeroclick-blue mb-4 text-center">
        🕐 {t("Today's Tasks")}
      </h2>
      <div className="bg-white rounded-2xl shadow-lg p-4">
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-xl mb-2 last:mb-0 ${
              task.urgent 
                ? 'bg-red-50 border-l-4 border-zeroclick-red' 
                : 'bg-gray-50 border-l-4 border-zeroclick-mint'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{task.task.split(' ')[0]}</span>
              <div>
                <p className="font-semibold text-zeroclick-blue">
                  {t(task.task.substring(2))}
                </p>
                <p className="text-sm text-zeroclick-blue/70">{task.time}</p>
              </div>
            </div>
            {task.urgent && (
              <div className="bg-zeroclick-red text-white px-3 py-1 rounded-full text-xs font-bold">
                {t('NOW')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTasks;

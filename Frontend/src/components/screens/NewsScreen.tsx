import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Volume2 } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import axios from "axios";

interface NewsItem {
  id: string;
  headline: string;
  category: string;
  icon: string;
  summary: string;
}

const NewsScreen = () => {
  const navigate = useNavigate();
  const [currentNews, setCurrentNews] = useState(0);
  const { speak, isSpeaking } = useTextToSpeech();
  const [tag, setTag] = useState("all")

  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      setNews([])
      let search_query = "Karnataka";
      if(tag == "🌐 World"){
        search_query = tag
      }
      const data = await axios.get("https://newsapi.org/v2/everything", {
        params: {
          q: `${search_query} AND ${tag}`,
          language: "en",
          pageSize: 10,
          apiKey: "d46b1849794b453d88e22c1d6b0d34e8",
        },
      });
      console.log("data", data.data.articles);

      const fetchedNews = data.data.articles;

      const fetchedNew: NewsItem[] = fetchedNews
        .filter((item: any) => item.description && item.description.trim() !== "")
        .map((item: any, index: number) => ({
          id: item.id || `api-${index}`,
          headline: item.title,
          category: "Local",
          summary: item.description,
          icon: "📰",
        }));

       setNews((prev) => [...prev, ...fetchedNew]);
       console.log("hiiii",news)
    };
    fetchNews();
  }, [tag]);
  if (!news.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-zeroclick-blue">
        Loading news...
      </div>
    );
  }

  const handleReadAloud = () => {
    const currentItem = news[currentNews];
    const textToRead = `${currentItem.category} news. ${currentItem.headline}. ${currentItem.summary}`;
    speak(textToRead);
  };

  const nextNews = () => {
    setCurrentNews((prev) => (prev + 1) % news.length);
  };

  const prevNews = () => {
    setCurrentNews((prev) => (prev - 1 + news.length) % news.length);
  };

  return (
    <div className="min-h-screen pb-[3rem] bg-gradient-to-br from-zeroclick-peach to-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-6">
        <button
          onClick={() => navigate("/")}
          className="bg-white rounded-full p-3 shadow-md"
        >
          <ArrowLeft size={24} className="text-zeroclick-blue" />
        </button>
        <h1 className="text-2xl font-bold text-zeroclick-blue">📰 News</h1>
        <button
          onClick={handleReadAloud}
          className={`bg-zeroclick-orange rounded-full p-3 shadow-md ${
            isSpeaking ? "animate-pulse" : ""
          }`}
        >
          <Volume2 size={24} className="text-white" />
        </button>
      </div>

      {/* News Categories */}
      <div className="px-6 mb-6">
        <div className="flex space-x-3 overflow-x-auto">
          {["📰 All", "🌐 World", "🇮🇳 India", "💡 Health", "🌦️ Weather"].map(
            (category) => (
              <button
              onClick={()=> setTag(category)}
                key={category}
                className="flex-shrink-0 bg-white px-4 py-2 rounded-full border-2 border-zeroclick-orange/20 text-zeroclick-blue font-semibold"
              >
                {category}
              </button>
            )
          )}
        </div>
      </div>

      {/* Main News Display */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{news[currentNews].icon}</span>
              <span className="bg-zeroclick-light-blue px-3 py-1 rounded-full text-sm font-bold text-zeroclick-blue">
                {news[currentNews].category}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {currentNews + 1} of {news.length}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-zeroclick-blue mb-4">
            {news[currentNews].headline}
          </h2>

          <p className="text-lg text-zeroclick-blue/80 leading-relaxed mb-6">
            {news[currentNews].summary}
          </p>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4">
            <button
              onClick={prevNews}
              className="bg-zeroclick-mint text-white rounded-full font-bold w-full sm:w-auto py-3 px-4"
              disabled={currentNews === 0}
            >
              <div className="flex items-center gap-2 justify-center">
                <div className="">←</div>
                <div className="">Previous</div>
              </div>
            </button>

            <button
              onClick={handleReadAloud}
              className={`bg-zeroclick-orange text-white px-6 py-3 rounded-full font-bold flex items-center space-x-2 ${
                isSpeaking ? "animate-pulse" : ""
              } w-full sm:w-auto justify-center`}
            >
              <Volume2 size={20} />
              <span>🔈 Read Aloud</span>
            </button>

            <button
              onClick={nextNews}
              className="bg-zeroclick-mint text-white px-6 py-3 rounded-full font-bold w-full sm:w-auto py-3 px-4"
              disabled={currentNews === news.length - 1}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* News List */}
      <div className="px-6 mb-20">
        <h3 className="text-xl font-bold text-zeroclick-blue mb-4">
          📰 More Headlines
        </h3>
        <div className="space-y-3">
          {news.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrentNews(index)}
              className={`w-full text-left bg-white rounded-2xl p-4 shadow-md ${
                index === currentNews
                  ? "border-2 border-zeroclick-orange"
                  : "border border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h4 className="font-bold text-zeroclick-blue">
                    {item.headline}
                  </h4>
                  <p className="text-sm text-zeroclick-blue/70">
                    {item.category}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNavigation currentScreen="news" />
    </div>
  );
};

export default NewsScreen;

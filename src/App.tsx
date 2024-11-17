import { useState } from "react";
import { Tab } from "./components/Tab";
import { ThemeSwap } from "./components/ThemeSwap";
import { ChatItem } from "./components/ChatItem";
import { InChat } from "./components/InChat";

function App() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div>
      <header className="text-center my-4 relative">
        <h4 className="font-bold text-lg">blurme</h4>
        <ThemeSwap />
      </header>

      <div role="tablist" className="tabs tabs-boxed">
        <Tab
          title="Chat list"
          active={activeTab === 1}
          onClick={() => setActiveTab(1)}
        />
        <Tab
          title="In chat"
          active={activeTab === 2}
          onClick={() => setActiveTab(2)}
        />
        {/* <Tab title="" active={activeTab === 3} onClick={() => setActiveTab(3)} /> */}
      </div>

      {activeTab === 1 && <ChatItem />}
      {activeTab === 2 && <InChat />}
    </div>
  );
}

export default App;

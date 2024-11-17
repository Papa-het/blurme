import { useEffect, useRef, useState } from "react";

const InChat = (): JSX.Element => {
  const [radius, setRadius] = useState(3);

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.style.setProperty("filter", `blur(${radius}px)`);
  }, [radius]);

  return (
    <div className="mt-4">
      <div className="mb-4">
        <label className="text-sm">Blur radius</label>
        <input
          type="range"
          min="0"
          max="10"
          className="range range-xs"
          value={radius}
          onChange={(e) => setRadius(parseInt(e.target.value))}
        />
      </div>

      <div
        ref={chatRef}
        className="rounded-lg bg-neutral-content p-2 w-full shadow-lg"
      >
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://www.liveabout.com/thmb/F5lfgFptU9DNTDCT-xNEtot0lQ0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/EP2-IA-60435_R_8x10-56a83bea3df78cf7729d314a.jpg"
              />
            </div>
          </div>
          <div className="chat-header">Obi-Wan Kenobi</div>
          <div className="chat-bubble">
            It's over Anakin, <br /> I have the high ground.
          </div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://nsabers.es/cdn/shop/articles/celehey_Anakin_Skywalker_wielding_blue_lightsaber_defeats_chanc_78152037-5543-4d57-9b68-8829daa3f9ee.png?v=1708935727"
              />
            </div>
          </div>
          <div className="chat-header">Anakin Skywaler</div>
          <div className="chat-bubble">You underestimate my power! </div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
      </div>
    </div>
  );
};

export { InChat };

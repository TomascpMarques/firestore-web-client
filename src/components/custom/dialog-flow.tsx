import Script from "next/script";

export default function DialogFlow() {
  return (
    <>
      <Script src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js" />
      <div className="absolute bottom-4 right-4">
        <df-messenger
          project-id="valiant-complex-415911"
          agent-id="b73276b7-4236-4f49-a952-2f31827fc948"
          language-code="en"
          max-query-length="-1"
        >
          <df-messenger-chat-bubble chat-title=""></df-messenger-chat-bubble>
        </df-messenger>
      </div>
    </>
  );
}

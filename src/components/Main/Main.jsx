import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/Context";

export default function Main()
{
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

    const handleSend = () =>
    {
        onSent();
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        onSent();
    };

    const formatText = (text) =>
    {
        if (!text) return "";
        return text.replace(/\n/g, '<br>');
    };

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">

                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hi, </span></p>
                            <p>How can I help?</p>
                        </div>

                    </>
                ) : (
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ?
                                <div className="loader">
                                    <div className="loader-bar"></div>
                                    <div className="loader-bar"></div>
                                    <div className="loader-bar"></div>
                                </div>
                                :
                                <p dangerouslySetInnerHTML={{ __html: formatText(resultData) }}></p>
                            }
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <form onSubmit={handleSubmit} className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Input prompt"
                        />
                        <div>

                            <img onClick={handleSend} src={assets.send_icon} alt="" />
                        </div>
                    </form>
                    <p className="bottom-info">
                        Gemini may display inaccurate info so be alert.
                    </p>
                </div>
            </div>
        </div>
    );
}

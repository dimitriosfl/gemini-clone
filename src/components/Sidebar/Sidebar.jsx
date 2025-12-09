import "./Sidebar.css"
import { assets } from "../../assets/assets"
import { useContext, useState } from "react"
import { Context } from "../../context/Context";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Sidebar()
{
    const [extended, setextended] = useState(false);
    const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context);
    const loadPrompt = async (prompt) =>
    {
        setRecentPrompt(prompt);
        await onSent(prompt);
    }

    return (
        <div className="sidebar">
            <div className="top">
                <img onClick={() => setextended(prev => !prev)} className="menu" src={assets.menu_icon} alt="" />
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ?
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompt.map((item, index) =>
                        {
                            return (
                                <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                                    <img src={assets.message_icon} alt="" />
                                    <p>{item.slice(0, 18)} ...</p>
                                </div>
                            )
                        })}

                    </div> : null}
            </div>
            <div className="bottom">
                <a href="https://github.com/dimitriosfl" target="_blank" rel="noopener noreferrer" className="bottom-item recent-entry">
                    <FaGithub />
                    {extended ? <p>GitHub</p> : null}
                </a>
                <a href="https://www.linkedin.com/in/dimitriosfl/" target="_blank" rel="noopener noreferrer" className="bottom-item recent-entry">
                    <FaLinkedin />
                    {extended ? <p>LinkedIn</p> : null}
                </a>
            </div>
        </div>
    )
}
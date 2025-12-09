import { createContext, useState } from "react";
import { callGemini } from "../config/gemini";

export const Context = createContext();

export default function ContextProvider(props)
{
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) =>
    {
        setTimeout(function ()
        {
            setResultData(prev => prev + nextWord);
        }, 75 * index)
    }

    const newChat = () =>
    {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) =>
    {
        try
        {

            const userPrompt = prompt || input;

            if (!userPrompt.trim()) return;

            setResultData("");
            setLoading(true);
            setShowResult(true);
            let result;
            if (prompt !== undefined)
            {
                result = await callGemini(prompt);
                setRecentPrompt(prompt);
            }
            else
            {
                setPrevPrompt(prev => [...prev, input]);
                setRecentPrompt(input);
                result = await callGemini(input);
            }

            let responseArray = result.split("**");
            let newResponse = "";
            for (let i = 0; i < responseArray.length; i++)
            {
                if (i === 0 || i % 2 !== 1)
                {
                    newResponse += responseArray[i];
                }
                else
                {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }
            let newResponse2 = newResponse.split("*").join("</br>")
            //console.log("Gemini response:", result);
            let newResponseArray = newResponse2.split(" ");
            for (let i = 0; i < newResponseArray.length; i++)
            {
                const nextWord = newResponseArray[i];
                delayPara(i, nextWord + " ");
            }

        } catch (error)
        {
            console.error('Context Error:', error);
            setResultData("Sorry, something went wrong. Please try again.");
        } finally
        {
            setLoading(false);
            setInput("");
        }
    };

    const contextValue = {
        input,
        setInput,
        recentPrompt,
        showResult,
        loading,
        resultData,
        onSent,
        prevPrompt,
        setRecentPrompt,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}

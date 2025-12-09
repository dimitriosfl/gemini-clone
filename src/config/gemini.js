export const callGemini = async (userPrompt) =>
{
    try
    {

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

        if (!apiKey)
        {
            throw new Error('VITE_GEMINI_API_KEY is not set in your environment variables');
        }

        console.log('API Key exists:', !!apiKey);

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const requestBody = {
            contents: [{
                parts: [
                    { text: userPrompt }
                ]
            }]
        };

        //console.log('Sending request to Gemini with prompt:', userPrompt);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok)
        {
            const errorData = await response.json();
            throw new Error(`HTTP Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();

        //console.log('Full response from Gemini:', data);

        if (data.candidates && data.candidates[0]?.content)
        {
            const result = data.candidates[0].content.parts[0].text;
            //console.log('Gemini Response:', result);
            return result;
        } else
        {
            throw new Error('No valid response from Gemini');
        }
    } catch (err)
    {
        console.error('Error calling Gemini:', err);
        console.error('Error details:', err.message);
        throw new Error(`API Error: ${err.message}`);
    }
};

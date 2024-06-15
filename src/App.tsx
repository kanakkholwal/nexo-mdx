import Editor from "./editor";

export default function App() {


    return <div className="w-full max-w-7xl mx-auto my-20">

        <Editor

            // handleCustomImageUpload={(e) => {
            //     console.log(e)
            //     return Promise.resolve({ url: 'https://lh3.googleusercontent.com/a/AEdFTp6mwH2C7lewN5u-JqoEmxKEgcbRc0G6SKZZn3tVEQ=s96-c', text: 'image' })
            // }}
            onImageUpload={(file: File) => {

                console.log(file)
                //  3 second wait
                new Promise((resolve) => {
                    setTimeout(resolve, 3000);
                });
                return Promise.resolve(`https://lh3.googleusercontent.com/a/AEdFTp6mwH2C7lewN5u-JqoEmxKEgcbRc0G6SKZZn3tVEQ=s96-c`);

            }}
            renderHtml={(html) => {
                return <>{html}</>
            }}
        />
    </div>
}
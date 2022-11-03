import { forwardRef, useRef, useState, useEffect } from "react";
import { data as emojiList } from "./data"
import EmojiButton from "./emojiButton";
import EmojiSearch from "./emojiSearch";
import styles from "./emojiPicker.module.scss";

export function EmojiPicker(props, inputRef){
    const [isOpen, setIsOpen] = useState(false);
    const [emoji, setEmoji] = useState([...emojiList]);
    const containerRef = useRef(null);

    useEffect(() => {
        window.addEventListener("click", (e) => {
            if(!containerRef.current.contains(e.target)){
               setIsOpen(false);
               setEmoji(emojiList);
            }
        });
    },[])

    function handleClickOpen(){
        setIsOpen(!isOpen)
    }

    function handleSearch(e){
        const q = e.target.value.toLowerCase();

        if(!!q) {
            const search = emojiList.filter((e) => {
                return (
                    e.name.toLowerCase().includes(q) || 
                    e.keywords.toLowerCase().includes(q)
                    );
                });
                console.log(search)
                setEmoji(search);
            }else{
                setEmoji(emojiList);
            }
    }

    /* function EmojiPickerContainer(){
        return (
            <div>
            <EmojiSearch onSearch={handleSearch}/>
            <div>
                {
                    emoji.map((emoji) => (<div key={emoji.symbol}>{emoji.symbol}</div>))
                }
            </div>
        </div>
        )
    } */

    function handleOnClickEmoji(emoji){
         const cursorPos = inputRef.current.selectionStart;
         const text = inputRef.current.value;
         const prev = text.slice(0, cursorPos);
         const next = text.slice(cursorPos);
         inputRef.current.value = prev + emoji.symbol + next;
         inputRef.current.selectionStart = cursorPos + emoji.symbol.length;
         inputRef.current.selectionEnd = cursorPos + emoji.symbol.length;
         inputRef.current.focus();
    }

    return (
    <div ref={containerRef} className={styles.inputContainer}>
       <button onClick={handleClickOpen} className={styles.emojiPickerButton}>😊</button>

       {isOpen ? ( 
       <div className={styles.emojiPickerContainer} >
            <EmojiSearch onSearch={handleSearch}/>
            <div className={styles.emojiList}>
                {emoji.map((e) => (
                    <EmojiButton
                    key={e.symbol}
                    emoji={e}
                    onClick={handleOnClickEmoji}
                    />
                ))}
            </div>
        </div>
        ) : (
            ""
         )}
    </div>
    );
}

export default forwardRef(EmojiPicker);
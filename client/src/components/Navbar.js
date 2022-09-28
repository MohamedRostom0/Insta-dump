import { useState } from "react";
import classes from "./Navbar.module.css";
import Modal from './Modal'
import { NewPost } from "./NewPost";

function Navbar() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const newPostHandler = () => {
        setModalIsOpen(true)
    }

    const closeModalHandler = () => {
        setModalIsOpen(false)
    }

    return (
        <>
            <div className={`${classes.nav}`}>
                <div className={classes.row}>
                    <h1 className={classes.nav__logo}>Insta Dump</h1>
                    <h2 onClick={newPostHandler}>New post</h2>
                </div>

                <img
                    className={classes.nav__avatar}
                    alt="Netflix user avatar"
                    src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg"
                />
            </div>

            {modalIsOpen && (<Modal onClose={closeModalHandler}>
                <NewPost />
            </Modal>)}
        </>
    );
}

export default Navbar;
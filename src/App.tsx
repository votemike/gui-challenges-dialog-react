import React, {useRef, useState} from 'react';
import './App.css';
import Dialog from "./Dialog";

function App() {
  const [users, setUsers] = useState([{
    image: "https://doodleipsum.com/700x700/avatar-5?i=e49dd48962488beade4c44491e56a5a9",
    name: "User 1"
  }, {image: "https://doodleipsum.com/700x700/avatar-5?i=ca71b901f3ad2ce77d50ab296aff3f5f", name: "User 2"}]);
  const miniModalRef = useRef<HTMLDialogElement>(null);
  const megaModalRef = useRef<HTMLDialogElement>(null);
  const megaModalFormRef = useRef<HTMLFormElement>(null);
  const selectedUserRef = useRef(null);
  const [miniModalStyles, setMiniModalStyles] = useState({});
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);

  function uploadFile() {
    const data = new FormData(megaModalFormRef.current ?? undefined)
    const file = data.get('userimage')
    // @ts-ignore
    if (!file?.size) {
      return;
    }

    const reader = new FileReader()
    // @ts-ignore
    reader.readAsDataURL(file);

    reader.onload = e => {
      setUsers(oldUsers =>
        [
          ...oldUsers,
          {
            image: e.target?.result as string,
            name: `User ${users.length + 1}`
          }
        ]
      );
    }

    megaModalFormRef.current?.reset();
  }

  function removeUser() {
    if (null === selectedUserIndex) {
      return;
    }

    // @ts-ignore
    selectedUserRef.current!.style.animation = 'var(--animation-scale-down), var(--animation-fade-out)';
    // @ts-ignore
    selectedUserRef.current!.addEventListener('animationend', e => {
      setUsers(users.filter((_, index) => index !== selectedUserIndex));
      setSelectedUserIndex(null);
    }, {once: true})
  }

  function closeDialog() {
    setSelectedUserIndex(null);
    miniModalRef.current?.close();
  }

  function openDeleteDialog(event: React.MouseEvent<HTMLButtonElement>, userIndex: number) {
    setSelectedUserIndex(userIndex);
    const clickedElement = event.target as HTMLButtonElement

    const bounds = clickedElement.getBoundingClientRect();
    // @ts-ignore
    const miniModalHeight = miniModalRef.current?.clientHeight() - 15
    // @ts-ignore
    const miniModalWidth = miniModalRef.current?.clientWidth() / 2

    let left = bounds.left - miniModalWidth
    if (left < 0) left = 10

    setMiniModalStyles({
      marginTop: bounds.y - miniModalHeight + 'px',
      marginLeft: window.innerWidth >= 768 ? left + 'px' : null,
    });
    // @ts-ignore
    miniModalRef.current?.open();
  }

  return (
    <>
      <Dialog ref={megaModalRef} modalMode="mega">
        <form method="dialog" ref={megaModalFormRef}>
          <header>
            <section className="icon-headline">
              <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
              <h3>New User</h3>
            </section>
            <button onClick={() => megaModalRef.current?.close()} type="button" title="Close dialog">
              <title>Close dialog icon</title>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </header>
          <article>
            <section className="labelled-input">
              <label htmlFor="userimage">Upload an image</label>
              <input id="userimage" name="userimage" type="file"/>
            </section>
            <small><b>*</b> Maximum upload 1mb</small>
          </article>
          <footer>
            <menu>
              <button type="reset" value="clear">Clear</button>
            </menu>
            <menu>
              <button autoFocus onClick={() => megaModalRef.current?.close()} type="button">Cancel
              </button>
              <button type="submit" value="confirm" onClick={uploadFile}>Confirm</button>
            </menu>
          </footer>
        </form>
      </Dialog>

      <Dialog ref={miniModalRef} modalMode="mini" modalStyles={miniModalStyles}>
        <form method="dialog">
          <article>
            <section className="warning-message">
              <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
                <title>A warning icon</title>
                <path
                  d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <p>Are you sure you want to remove this user?</p>
            </section>
          </article>
          <footer>
            <menu>
              <button autoFocus type="button" onClick={closeDialog}>Cancel</button>
              <button type="submit" value="confirm" onClick={removeUser}>Confirm</button>
            </menu>
          </footer>
        </form>
      </Dialog>

      <main>
        {users.map((user, index) => (
          <div className="user" key={user.name} ref={index === selectedUserIndex ? selectedUserRef : null}>
            <img src={user.image} alt=""/>
            <button aria-label={`Remove ${user.name}`} onClick={(event) => openDeleteDialog(event, index)}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        ))}

        <button className="user" onClick={() => {
          // @ts-ignore
          megaModalRef.current?.open();
        }} aria-label="Add user">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </main>
    </>
  );
}

export default App;

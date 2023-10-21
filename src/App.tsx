import React from 'react';
import logo from './logo.svg';
import './App.css';

declare module 'react' {
  interface HTMLAttributes<T>
    extends React.AriaAttributes, React.DOMAttributes<T> { inert?: '';}
}

function App() {
  const [megaModalOpen, setMegaModalOpen] = React.useState(false);
  return (
    <>
      {/*<dialog id="MegaDialog" inert='' loading modal-mode="mega">*/}
      <dialog id="MegaDialog" inert={megaModalOpen ? undefined : ''} modal-mode="mega" open={megaModalOpen}>
      <form method="dialog">
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
          <button onClick={() => setMegaModalOpen(false)} type="button" title="Close dialog">
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
            <button autoFocus type="button" onClick={() => setMegaModalOpen(false)}>Cancel</button>
            <button type="submit" value="confirm">Confirm</button>
          </menu>
        </footer>
      </form>
    </dialog>

  {/*<dialog id="MiniDialog" inert='' loading modal-mode="mini">*/}
  {/*  <form method="dialog">*/}
  {/*    <article>*/}
  {/*      <section className="warning-message">*/}
  {/*        <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">*/}
  {/*          <title>A warning icon</title>*/}
  {/*          <path*/}
  {/*            d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>*/}
  {/*          <line x1="12" y1="9" x2="12" y2="13"></line>*/}
  {/*          <line x1="12" y1="17" x2="12.01" y2="17"></line>*/}
  {/*        </svg>*/}
  {/*        <p>Are you sure you want to remove this user?</p>*/}
  {/*      </section>*/}
  {/*    </article>*/}
  {/*    <footer>*/}
  {/*      <menu>*/}
  {/*        <button autoFocus type="button" onClick="this.closest('dialog').close('cancel')">Cancel</button>*/}
  {/*        <button type="submit" value="confirm">Confirm</button>*/}
  {/*      </menu>*/}
  {/*    </footer>*/}
  {/*  </form>*/}
  {/*</dialog>*/}

  <main>
    <div className="user">
      <img src="https://doodleipsum.com/700x700/avatar-5?i=e49dd48962488beade4c44491e56a5a9" alt=""/>
        <button title="Remove user">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
    </div>
    <div className="user">
      <img src="https://doodleipsum.com/700x700/avatar-5?i=ca71b901f3ad2ce77d50ab296aff3f5f" alt=""/>
        <button title="Remove user">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
    </div>
    <button className="user" onClick={() => setMegaModalOpen(true)}>
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

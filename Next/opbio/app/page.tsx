import Link from "next/link";

export default async function Home() {
  return (
    <div className="wrapper">
      <nav>
        <img
          src="https://s3-alpha-sig.figma.com/img/4d1b/1b93/a7ed008cb385e998bfa2669d055f856d?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BNGVYnawDb~-lZqYi63gf2hn-iGN5pmgXHm4woQBLlYf~D3quh3IfjNsQm~xsYmqOd7v8r4YZXEPttRCVbD5SU5FSCEFrLJtBtz~~Enpk6ac6~9J27LO52AmuLMkFCvktTbJwkzTZTIQLHrTRAFFL6c6Q5XVNomDrQmsrI-XPhSTrirDnwjj8JCwp02ITgLtlIo8Axh6H0daqm8UgAG-2WmG5XCaJsSNgYIhEP27mTmUDdGvYeURiKtY~1ivuQk0yHFN2CjXJYOTI-O2K13XhiCj6RPQHARJxGNzqnk~Fd46lDznjnWCUQIhB~JX6C-JAkIw52j7GJlKQ6QTAVGV3g__"
          alt=""
        />
        <Link href="/login">Login</Link>
      </nav>
      <header>
        <div className="leftSide">
          <h1>Mark your digital presence with ease</h1>
          <p>
            Mark your digital presence with ease.Mark your digital presence with
            ease.Mark your digital presence with ease.Mark your digital presence
            with ease.
          </p>

          <div className="usernameBg">
            <input type="text" placeholder="op.bio/username" />
            <button>Take you username</button>
          </div>
        </div>
        <div className="rightSide">
          <div className="imgRightSide">
            <div className="itemRightSide">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
              >
                <path
                  d="M34.9479 10L42.7778 17.8299C43.1076 18.1597 43.1076 18.6979 42.7778 19.0278L23.8194 37.9861L15.7639 38.8802C14.6875 39.0017 13.776 38.0903 13.8976 37.0139L14.7917 28.9583L33.75 10C34.0799 9.67013 34.6181 9.67013 34.9479 10ZM49.0104 8.01215L44.7743 3.77604C43.4549 2.45659 41.3108 2.45659 39.9826 3.77604L36.9097 6.84895C36.5799 7.17881 36.5799 7.71701 36.9097 8.04687L44.7396 15.8767C45.0694 16.2066 45.6076 16.2066 45.9375 15.8767L49.0104 12.8038C50.3299 11.4757 50.3299 9.33159 49.0104 8.01215ZM33.3333 32.8299V41.6667H5.55556V13.8889H25.5035C25.7812 13.8889 26.0417 13.776 26.2413 13.5851L29.7135 10.1128C30.3733 9.45312 29.9045 8.33333 28.9757 8.33333H4.16667C1.86632 8.33333 0 10.1996 0 12.5V43.0556C0 45.3559 1.86632 47.2222 4.16667 47.2222H34.7222C37.0226 47.2222 38.8889 45.3559 38.8889 43.0556V29.3576C38.8889 28.4288 37.7691 27.9687 37.1094 28.6198L33.6371 32.092C33.4462 32.2917 33.3333 32.5521 33.3333 32.8299Z"
                  fill="#26272B"
                />
              </svg>
              <div className="textContainer">
                <h1>Customizable</h1>
                <h2>You can coustomize your whole profile</h2>
              </div>
            </div>
            <div className="itemRightSide">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
              >
                <path
                  d="M34.9479 10L42.7778 17.8299C43.1076 18.1597 43.1076 18.6979 42.7778 19.0278L23.8194 37.9861L15.7639 38.8802C14.6875 39.0017 13.776 38.0903 13.8976 37.0139L14.7917 28.9583L33.75 10C34.0799 9.67013 34.6181 9.67013 34.9479 10ZM49.0104 8.01215L44.7743 3.77604C43.4549 2.45659 41.3108 2.45659 39.9826 3.77604L36.9097 6.84895C36.5799 7.17881 36.5799 7.71701 36.9097 8.04687L44.7396 15.8767C45.0694 16.2066 45.6076 16.2066 45.9375 15.8767L49.0104 12.8038C50.3299 11.4757 50.3299 9.33159 49.0104 8.01215ZM33.3333 32.8299V41.6667H5.55556V13.8889H25.5035C25.7812 13.8889 26.0417 13.776 26.2413 13.5851L29.7135 10.1128C30.3733 9.45312 29.9045 8.33333 28.9757 8.33333H4.16667C1.86632 8.33333 0 10.1996 0 12.5V43.0556C0 45.3559 1.86632 47.2222 4.16667 47.2222H34.7222C37.0226 47.2222 38.8889 45.3559 38.8889 43.0556V29.3576C38.8889 28.4288 37.7691 27.9687 37.1094 28.6198L33.6371 32.092C33.4462 32.2917 33.3333 32.5521 33.3333 32.8299Z"
                  fill="#26272B"
                />
              </svg>
              <div className="textContainer">
                <h1>Customizable</h1>
                <h2>You can coustomize your whole profile</h2>
              </div>
            </div>
            <div className="itemRightSide">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
              >
                <path
                  d="M34.9479 10L42.7778 17.8299C43.1076 18.1597 43.1076 18.6979 42.7778 19.0278L23.8194 37.9861L15.7639 38.8802C14.6875 39.0017 13.776 38.0903 13.8976 37.0139L14.7917 28.9583L33.75 10C34.0799 9.67013 34.6181 9.67013 34.9479 10ZM49.0104 8.01215L44.7743 3.77604C43.4549 2.45659 41.3108 2.45659 39.9826 3.77604L36.9097 6.84895C36.5799 7.17881 36.5799 7.71701 36.9097 8.04687L44.7396 15.8767C45.0694 16.2066 45.6076 16.2066 45.9375 15.8767L49.0104 12.8038C50.3299 11.4757 50.3299 9.33159 49.0104 8.01215ZM33.3333 32.8299V41.6667H5.55556V13.8889H25.5035C25.7812 13.8889 26.0417 13.776 26.2413 13.5851L29.7135 10.1128C30.3733 9.45312 29.9045 8.33333 28.9757 8.33333H4.16667C1.86632 8.33333 0 10.1996 0 12.5V43.0556C0 45.3559 1.86632 47.2222 4.16667 47.2222H34.7222C37.0226 47.2222 38.8889 45.3559 38.8889 43.0556V29.3576C38.8889 28.4288 37.7691 27.9687 37.1094 28.6198L33.6371 32.092C33.4462 32.2917 33.3333 32.5521 33.3333 32.8299Z"
                  fill="#26272B"
                />
              </svg>
              <div className="textContainer">
                <h1>Customizable</h1>
                <h2>You can coustomize your whole profile</h2>
              </div>
            </div>
            <div className="itemRightSide">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
              >
                <path
                  d="M34.9479 10L42.7778 17.8299C43.1076 18.1597 43.1076 18.6979 42.7778 19.0278L23.8194 37.9861L15.7639 38.8802C14.6875 39.0017 13.776 38.0903 13.8976 37.0139L14.7917 28.9583L33.75 10C34.0799 9.67013 34.6181 9.67013 34.9479 10ZM49.0104 8.01215L44.7743 3.77604C43.4549 2.45659 41.3108 2.45659 39.9826 3.77604L36.9097 6.84895C36.5799 7.17881 36.5799 7.71701 36.9097 8.04687L44.7396 15.8767C45.0694 16.2066 45.6076 16.2066 45.9375 15.8767L49.0104 12.8038C50.3299 11.4757 50.3299 9.33159 49.0104 8.01215ZM33.3333 32.8299V41.6667H5.55556V13.8889H25.5035C25.7812 13.8889 26.0417 13.776 26.2413 13.5851L29.7135 10.1128C30.3733 9.45312 29.9045 8.33333 28.9757 8.33333H4.16667C1.86632 8.33333 0 10.1996 0 12.5V43.0556C0 45.3559 1.86632 47.2222 4.16667 47.2222H34.7222C37.0226 47.2222 38.8889 45.3559 38.8889 43.0556V29.3576C38.8889 28.4288 37.7691 27.9687 37.1094 28.6198L33.6371 32.092C33.4462 32.2917 33.3333 32.5521 33.3333 32.8299Z"
                  fill="#26272B"
                />
              </svg>
              <div className="textContainer">
                <h1>Customizable</h1>
                <h2>You can coustomize your whole profile</h2>
              </div>
            </div>
            <div className="itemRightSide">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
              >
                <path
                  d="M34.9479 10L42.7778 17.8299C43.1076 18.1597 43.1076 18.6979 42.7778 19.0278L23.8194 37.9861L15.7639 38.8802C14.6875 39.0017 13.776 38.0903 13.8976 37.0139L14.7917 28.9583L33.75 10C34.0799 9.67013 34.6181 9.67013 34.9479 10ZM49.0104 8.01215L44.7743 3.77604C43.4549 2.45659 41.3108 2.45659 39.9826 3.77604L36.9097 6.84895C36.5799 7.17881 36.5799 7.71701 36.9097 8.04687L44.7396 15.8767C45.0694 16.2066 45.6076 16.2066 45.9375 15.8767L49.0104 12.8038C50.3299 11.4757 50.3299 9.33159 49.0104 8.01215ZM33.3333 32.8299V41.6667H5.55556V13.8889H25.5035C25.7812 13.8889 26.0417 13.776 26.2413 13.5851L29.7135 10.1128C30.3733 9.45312 29.9045 8.33333 28.9757 8.33333H4.16667C1.86632 8.33333 0 10.1996 0 12.5V43.0556C0 45.3559 1.86632 47.2222 4.16667 47.2222H34.7222C37.0226 47.2222 38.8889 45.3559 38.8889 43.0556V29.3576C38.8889 28.4288 37.7691 27.9687 37.1094 28.6198L33.6371 32.092C33.4462 32.2917 33.3333 32.5521 33.3333 32.8299Z"
                  fill="#26272B"
                />
              </svg>
              <div className="textContainer">
                <h1>Customizable</h1>
                <h2>You can coustomize your whole profile</h2>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section>
        <h1>Take a closer look</h1>
        <h2>Mark your digital presence</h2>
        <div className="listOfFeatures">
          <div className="item1"></div>
          <div className="item2"></div>
          <div className="item2"></div>
          <div className="item1"></div>
          <div className="item1"></div>
          <div className="item2"></div>
        </div>
      </section>

      <div className="section2">
        <div className="joinToOur">
          <h1>Join to our community today!</h1>
          <div className="buttonsSection2">
            <button className="btn1">Apply for invite</button>
            <Link href="/register" className="btn2">
              Register
            </Link>
          </div>
        </div>
      </div>

      <footer>
        <div className="navInFooter">
          <button>Terms of Service</button>
          <button>Privacy Policy</button>
          <button>FAQ</button>
          <button>Discord</button>
        </div>
      </footer>

      <div className="cr">
        <h1>opbio.club. - All Rights reserved.</h1>
      </div>
    </div>
  );
}

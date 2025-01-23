import "./main.css";

export default function Page() {




    return (
        <form action="" className="wrapperMain" >
            <div className="email">
                <h1>Email</h1>
                <div className="bg1">
                    <i className="fa-solid fa-envelope"></i>
                    <input name="email" type="email"  />
                </div>
            </div>

            <div className="password">
                <h1>Password</h1>
                <div className="bg2"  >
                    <i className="fa-solid fa-lock"></i>
                    <input name="password" type="password" />
                </div>
            </div>


        </form>
    )
}
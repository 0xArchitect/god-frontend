const Banner = () => {
    return <div id='Banner'>
        <h2>GROK 2.0</h2>
        <a href="#" className="cta">
            Buy Now
        </a>
        <ul className="social-icons">
            {
                ['fab fa-medium', 'fab fa-twitter', 'fab fa-telegram'].map((e) => {
                    return <li>
                        {/* <img src={e} /> */}
                        <span className={e}>
                        </span>
                    </li>
                })
            }
        </ul>
        <a href="#" className="cta2"><span className="underline">Etherscan</span>
            {/* <img src="https://placehold.co/10x10/png" /> */}
            <span className="fas fa-link">
            </span>
        </a>
    </div>
}

export default Banner;
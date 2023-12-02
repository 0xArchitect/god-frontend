import { useCallback } from "react";
import Particles from "react-particles";
import json from './particles.json'
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.

const Tokenomics = () => {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadFull(engine);
        // await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return <div id='Tokenomics'>
        <h4>
            {
                'TOKENOMICS'.split('').map((letter, index) => <span key={index} className="letter">{letter}</span>)
            }
        </h4>
        <div className="table">
            <div className="column">
                <span className="text1">
                    Total Supply
                </span>
                <span className="grey text2">
                    6,900,000,000
                </span>
                <span className="text3">
                    Buy/Sell Fee
                </span>
                <span className="text4">
                    0%
                </span>
            </div>
            <div className="column blue">
                <a href="#" className="view-contract">
                    View Contract
                </a>
            </div>
            <div className="column">
                <span className="text1">
                    Contract Renounced
                </span>
                <span className="grey text6">
                    0x87D907568A0761Ea45D2917E324557920668f224
                </span>
                <a href="#" className="cta">
                    COPY CONTRACT ADDRESS
                </a>
            </div>
        </div>
        <div className="particles">
            {/* <Particles id="tsparticles" style={{
                height: '100%',
            }} url={'/particles.json'} init={particlesInit} loaded={particlesLoaded} /> */}
        </div>
    </div>
}

export default Tokenomics;
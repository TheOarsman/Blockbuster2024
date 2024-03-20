import { useState } from "react";
import { Link } from "react-router-dom";

import "../footer.css";

const Footer = () => {

  return (
    <>
      <div>
        <footer className="footer">
            {/* Sections for our developer info (GitHub, LinkedIn, some third thing) */}
            <div>
                Ethan Wynne
                <ul>
                    <li><a href="https://github.com/ethanfrog">GitHub</a></li>
                    <li><a href="https://www.linkedin.com/in/ethan-wynne-b2a956161/">LinkedIn</a></li>
                    <li></li>
                </ul>
            </div>
            <div>
                Whitney Simpson
                <ul>
                    <li><a href="">GitHub</a></li>
                    <li><a href="">LinkedIn</a></li>
                    <li></li>
                </ul>
            </div>
            <div>
                Heinz Ulrich
                <ul>
                    <li><a href="">GitHub</a></li>
                    <li><a href="">LinkedIn</a></li>
                    <li></li>
                </ul>
            </div>
            <div>
                Greg Greve
                <ul>
                    <li><a href="">GitHub</a></li>
                    <li><a href="">LinkedIn</a></li>
                    <li></li>
                </ul>
            </div>
            <div>
                Nicholas Eggleston
                <ul>
                    <li><a href="">GitHub</a></li>
                    <li><a href="">LinkedIn</a></li>
                    <li></li>
                </ul>
            </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;

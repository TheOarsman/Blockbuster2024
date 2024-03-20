import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {

  return (
    <>
      <div>
        <footer>
            {/* Sections for our developer info */}
            <div>
                Ethan Wynne
                <ul>
                    <li><a href="https://github.com/ethanfrog">GitHub</a></li>
                    <li><a href="https://www.linkedin.com/in/ethan-wynne-b2a956161/">LinkedIn</a></li>
                </ul>
            </div>
            <div>
                Whitney Simpson
                <ul>
                    <li>GitHub</li>
                    <li>LinkedIn</li>
                </ul>
            </div>
            <div>
                Heinz Ulrich
                <ul>
                    <li>GitHub</li>
                    <li>LinkedIn</li>
                </ul>
            </div>
            <div>
                Greg Greve
                <ul>
                    <li>GitHub</li>
                    <li>LinkedIn</li>
                </ul>
            </div>
            <div>
                Nicholas Eggleston
                <ul>
                    <li>GitHub</li>
                    <li>LinkedIn</li>
                </ul>
            </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;

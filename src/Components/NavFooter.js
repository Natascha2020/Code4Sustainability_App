import React from "react";
import { Footer, Text } from "grommet";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUserSecret, faShareAlt, faGift } from "@fortawesome/free-solid-svg-icons";

import "../Styles/NavFooter.css";

const NavFooter = () => {
  return (
    <div>
      <hr />
      <Footer pad="medium">
        <a className="link" href="http: ">
          <FontAwesomeIcon icon={faUserSecret} size="lg" />
          <span>Security</span>
        </a>

        <a className="link" href="https://github.com/Natascha2020/Code4Sustainability_APP.git">
          <FontAwesomeIcon icon={faGithub} size="lg" />
          <span>Source code</span>
        </a>

        <a className="link" href="http: ">
          <FontAwesomeIcon icon={faShareAlt} size="lg" />
          <span>Share</span>
        </a>

        <a className="link" href="http: ">
          <FontAwesomeIcon icon={faGift} size="lg" />
          <span>Supporter</span>
        </a>

        <br />
        <Text> &lt;/ Ready to impact! &gt;</Text>
      </Footer>
    </div>
  );
};

export default NavFooter;

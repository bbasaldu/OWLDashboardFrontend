import TextToolTip from "./TextToolTip";
import React from "react";
import classes from "./AboutConent.module.css";

import Collapse from "./Collapsible";


const AboutContent = () => {
  
  const ow = {
    name: "Overwatch",
    desc: `
    Overwatch is a team-based first-person shooter video game.
    `,
  };
  const esports = {
    name: "esports",
    desc: `
      Electronic sports, video games played competitively by professional gamers for spectators.
      `,
  };
  //for my tooltip, I add a span and a div inside of the span
  //but the browser does not allow div being inside of a p tag
  //so my workaround for now is just using div instead of p
  return (
    <React.Fragment>
      <div className={classes.about}>
        <div className={classes.paragraphs}>
          &emsp; Hello, my name is Brian Basaldua and this is my first full
          stack web app that I have produced to demonstrate my web development
          capabilites. Before I list what went into making this project, let me
          start off by describing what my idea was for this project and why.
        </div>
        <div className={classes.paragraphs}>
          &emsp; I wanted to make something that was fun for me but that I could
          also use to demonstrate and incorporate commonly sought out
          technologies/skills for web development. I am a big fan of &nbsp;
          <TextToolTip text={ow.name} tipText={ow.desc} id="ow" />, and it's
          &nbsp;
          <TextToolTip
            text={esports.name}
            tipText={esports.desc}
            id="esports"
          />{" "}
          scene called the Overwatch League. On their official website, they
          have a list of all of the players. When you click on their profile it
          takes you to a very minimal player info page. I thought this was odd
          as they have very in-depth stats on each of the players. Instead they
          opted to make a seperate stats page using tableu, which attempts to
          show this data in a very convoluted way that includes all players and
          teams in one dashboard. And most of the 'visualization' is just basic
          tables. I thought it would be nice to come up with a simple concept
          for a player page with a much nicer and 'visual' dashboard. This is an
          ongoing personal project that I will update over time as there are things i want to fix
          and A LOT of things i want to add.
        </div>
        <div className={classes.paragraphs}>Technologies/Skills Summary:</div>
        <Collapse header="MERN Stack">
          <Collapse header="MongoDB">
            <p>
              Used as my database.
              <br />
              <br />
              Used alongside Mongoose.js to easily connect to specific
              collections in my database. Also created basic models and schemas
              for my documents.
            </p>
          </Collapse>
          <Collapse header="Express.js">
            <p>
              Main web app framework to create server
              <br />
              <br />
              Handling various routes including REST API routes and serving
              frontend code
              <br />
              <br />
              Overwatch does not have an offical API, so i created a very basic
              REST API that only supports a few endpoints. These endpoints only
              support GET requests and are used to retrieve different types of
              data.
              <br />
              <br />
              Also created controllers in conjunction with mongoose to handle
              get requests and pull from database
              <br />
              <br />
              Added approriate middleware for development and production
            </p>
          </Collapse>
          <Collapse header="React">
            <p>
              Frontend framework for layout and UI
              <br />
              <br />
              Used function based components and a variety of hooks
              <br />
              <br />
              Demonstrates my knowledge of html, css, and javascript in the form
              of jsx.
              <br />
              <br />
              Web app is responsive
              <br />
              <br />
              Used react-redux for state management and even more managable
              state slices. Slice examples include, changing global player data state, so that it can
              trigger changes in chart components.
              <br />
              <br />
              Used react-router to handle routes for multi-page SPA
              <br />
              <br />
              Other best useful best practice's assoiciated with react such as
              using CSS modules and environment variables.
            </p>
          </Collapse>
          <Collapse header="Node.js">
            <p>
              Using a variety of node packages to acheieve additonal
              functionality.
              <br/><br/>
              As stated above, the overwatch league website does not have an offical API,
              instead they upload and update zipped CSV files of the stats.
            Manually downloading the files is tedious, so i used a few packages to automate this process.
            Namely, Puppeteer, Axios and Adm-zip. I use Puppeteer to scrape the website for the dynamic download link,
            then i make a request to the link url using Axios, and stream the data to Adm-zip which can unzip a file in a buffer.
            I then use my schemas to create structured player profile documents after parsing the CSV file. 
            This data is then pushed to my player collection in my database, which i can then retrieve from my API.

            </p>
          </Collapse>
        </Collapse>
        <Collapse header="D3.js">
            <p>
                Data visualization library for javascript
                <br/><br/>
                Used various react functionality to imbed D3 code into react components such as
                useEffect() to render svg graphics after react component render. Also used useState,
                to change data shown in charts when the selection, from the select tag, is changed.
            </p>
        </Collapse>
      </div>
    </React.Fragment>
  );
};
export default AboutContent;

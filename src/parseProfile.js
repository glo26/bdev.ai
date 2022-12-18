// Profile extractor. Need to do this once for sender, once for receiver.
const extract_profile_name = (document) => {
  var profile_name = "";
  var els = document.querySelectorAll(".text-heading-xlarge");
  for (const element of els) {
    profile_name = element.innerText;
  }
  return profile_name;
};

const extract_profile_info = (document) => {
  var profile_info = {};
  var current_key = null;
  var current_value = null;

  var els = document.querySelectorAll(".visually-hidden");
  const key_elements = [
    "About",
    "Education",
    "Experience",
    "Volunteering",
    "Licenses & certifications",
    "Skills",
    "Recommendations",
    "Honors & awards",
    "Organizations",
    "Causes",
    "Publications",
    "Courses",
    "Interests",
    "Projects",
    "Patents",
  ];

  for (const element of els) {
    var hidden_element = element.innerText;

    if (key_elements.includes(hidden_element)) {
      if (current_key != null) {
        profile_info[current_key] = current_value;
      }
      current_key = hidden_element;
      current_value = "";
    } else {
      current_value = current_value + " " + hidden_element;
    }
  }
  return profile_info;
};

const getProfileInfo = () => {
  const profile_name = extract_profile_name(document);
  const profile_info = extract_profile_info(document);
  profile_info["Name"] = profile_name;
  profile_info["URL"] = window.location.href;
  return profile_info;
};

export const sendStringToServer = (textContainer, textArea, suggestionsDiv) => {
  // Send a POST request to the server with the string as the body
  console.log("here is our text container");
  console.log(textContainer);
  const jsonToSend = {
    data: {
      sender: {
        About:
          " Gloria Felicia (also known as: ‘Glo’) is a technology entrepreneur and advisor with a deep passion for Applied AI in B2B, GTM optimization, and automation. Prior to being the CEO at Bdev.ai, Glo was the CEO of a global digital software agency and a PM at CFA Institute. Glo has advised 100+ startups and served as an international board member through Founders Institute, EO, and AYEC. She currently advises through Spero Studios and seats as a board member of Moxey. Glo holds an executive certification in AI from MIT and in Marketing from Cornell along with a BS in IT and Business Analytics from University of Virginia. — Glo has also been a speaker at technical and business conferences such as C2, TED, and Forbes Under 30. Her expertise includes Go-to-market Strategy, Applied AI, and UX. Invite Glo as a speaker by emailing press@bdev.ai.",
        Experience:
          " CEO + Founder Bdev.ai Nov 2022 - Present · 2 mos Building a generative AI sales engine tool that can supercharge your business development team and achieve a higher conversion rate. | Request a demo: https://bdev.ai  Board Member (GTM) Moxey Oct 2022 - Present · 3 mos Moxey is a B2B fintech startup that focuses on the power of sharing economy. It empowers many local communities of business owners nationwide and is powered by blockchain. | https://moxeyusa.com Peer Advisor (UX, AI/ML) Google Jan 2019 - Present · 4 yrs Active contributor and mentor at Google Women Techmakers (WTM) and Google Developers Group (GDG) San Francisco and Silicon Valley. Speaking topics include: AI, UX/User-Centric Programming, and Blockchain. Startup Advisor (D2C, GTM) Spero Studios Nov 2018 - Present · 4 yrs 2 mos Spero Studios is a venture studio with social impact and usability at its core mission, with portfolio ranging from web3, ecommerce, to enterprise technologies. General Inquiries: hello@sperostudios.io CEO (Digital Agency, E-commerce) GRIT&GLO, LLC Jan 2017 - Dec 2021 · 5 yrs We consisted of a remote team of 3 full-time team members and 20+ developers, designers, and copywriters. With a combined background in design, business, and technology, we helped brands thrive. We delivered the following with great care, compassion, and creativity: - UI/UX Design - Brand Identity - iOS App Development - Android App Development - Landing Page Development - E-Commerce Web Development - Custom IT Maintenance Solutions Why us? We put branding first. Branding with targeted content, consistency, and clarity will attract an audience that best fits the company’s vision. We believe that technology and branding must go together as your company grows.",
        Education:
          " Massachusetts Institute of Technology Graduate-level Certification (AI, Machine Learning), Computer Science Strengthened the foundational understanding of AI and Machine Learning models, using Python and real-life business case studies. MIT - IDSS Cornell University MBA-level Graduate Certificate, Marketing Strategy + Operations, Sales, Digital Marketing, Distribution Systems, Automation Collaborated with other Marketing Executives/Professionals in the managerial and C-level suites to spark meaningful discussions and online projects related to marketing strategies and strategic partnerships. MBA-level Marketing Strategy Certification - Cornell University UVA McIntire School of Commerce Bachelor of Science - BS, Computer/Information Technology Administration and Management Grade: 3.8/4.0 Activities and societies: Activities and societies: HackCville, Works In Progress (WIP), Chi Alpha Member, UVA Devhub, Madison House, XAi, Women Business Forum at McIntire (WBFM), Hackathons, Smart Woman Securities (SWS), Hack.UVA, Disrupt the District @1776 Hackathons.Activities and societies: HackCville, Works In Progress (WIP), Chi Alpha Member, UVA Devhub, Madison House, XAi, Women Business Forum at McIntire (WBFM), Hackathons, Smart Woman Securities (SWS), Hack.UVA, Disrupt the District @1776 Hackathons. - Forbes 30 Under 30 Scholar (2016), Boston, MA - Miniotas Scholar, ICE Block 8, McIntire School of Commerce - Scholarship Recipient for 'Digital Marketing' Trip to visit UK + Ireland - Scholarship Recipient for 'Digital Safari' Spring in Silicon Valley + Palo Alto. - Shortlisted to intern at McKinsey, Bain, and BCG, but decided to pursue startup.",
        Volunteering:
          " TEDWomen TED Conferences Jan 2009 - Present · 14 yrs Science and Technology Active community member and TED Translator. Translated numerous videos from English to Indonesian as well as reviewed the cultural context for the respective content. The journey started from when I was in highschool to post-graduate period. TED Talks were an important part of my personal growth and self-learning, so much so that I decided to attend TED Conference. Follow me here: https://www.ted.com/profiles/1073414/about Startup Mentor Founder Institute Jan 2022 - Present · 1 yr Economic Empowerment Silicon Valley Chapter. Mentored 100+ startups on the topics of: Branding, UI/UX, Product Development, and Go-To-Market Strategy. Executive Committee Member Entrepreneurs'​ Organization Jun 2019 - May 2020 · 1 yr Economic Empowerment - Managed the ebs and flow of the TEDTalk-style rundown - Assisted with the execution of speaker training series - Designed and developed the design assets + website About EO: https://www.eonetwork.org/ https://eotalkindonesia.id/ | http://eo.or.id/",
        "Licenses & certifications":
          " YC Startup School Y Combinator Issued Jul 2022 · No Expiration Date Google Analytics | Google Adwords Google Issued Mar 2020 · No Expiration Date Ecommerce Masterclass Foundr Issued Feb 2020 · No Expiration Date",
        Skills:
          " Public Speaking Endorsed by Spencer Lestiadi and 2 others who are highly skilled at this Endorsed by 6 colleagues at University of Virginia 99+ endorsements Leadership Endorsed by Valerie Van V. and 5 others who are highly skilled at this Endorsed by 6 colleagues at University of Virginia 99+ endorsements Project Management Endorsed by 5 colleagues at University of Virginia 65 endorsements",
        Recommendations:
          " Received Given Ahjeong Yeom Third degree connection MS in Analytics (Data Science) Candidate at the University of Chicago July 15, 2020, Ahjeong worked with Gloria on the same team I had the pleasure of working with Glo for three years at G&G, an agency we grew together. “Practical yet creative” is the phrase that comes to mind when I think of Glo. She consistently applied innovative thinking frameworks to all our projects and was able to determine which creative path is best suited to solving each problem we faced. Glo planned executable and effective strategies. She also challenged me and the team to think beyond the status quo and seek efficient methods to make the business more successful, operationally lean, and scalable from 'Day One'. Particularly, I was impressed by Glo’s business development skills. She grew our accounts from a US-only market to a global market and managed client relationships successfully, proven by the fact that we had mostly long-term clients. Glo has the ability to turn a stranger into a loyal client with her outstanding interpersonal talent. She has always been confident in building relationships and turning them into meaningful connections as she truly believes in helping people succeed. Internally, Glo has supported G&G team with individual and career developments, as well. I recommend Glo for anyone who wants to take his or her business to the next level. Her experience in starting and building businesses, coupled with innovation-driven and creative approaches, will be a great asset, anywhere she goes. McKenzie Vaughan Third degree connection Account Executive at Creative Circle April 30, 2019, McKenzie managed Gloria directly I had the pleasure of working as Glo's supervisor for the past year on the ZTE Collegiate Representative program. Glo was an exemplary member of the ZTE Collegiate representative team, so much so, she was promoted following her first semester with us to be a founding member of our senior team. She is always willing to go above and beyond to get the job done, as well as mentor and encourage her teammates to accomplish the same. She is a driven, creative and an intelligent individual who is eager to learn. I would highly recommend Glo to any employer.  Brian Greenwald Third degree connection Chief Impact Officer at Generate_Impact February 2, 2018, Brian managed Gloria directly Gloria came to my team to fill a gap we suddenly had in our creative services production management. It was a very challenging and complex situation, and she excelled. Gloria's high level of professionalism, skill and focus kept our demanding operation afloat, and her innovative ideas and improvements made a significant, positive difference. Gloria is a talented and high character person who will go very far. I hope I am lucky enough to work with her again. Envi Bagus Aditya Third degree connection Web3 UI/UX Designer July 11, 2022, Gloria managed Envi Bagus directly Envi was an excellent UX Designer. He fully understood the assignment and all sub-tasks at hand, worked independently, and created an impressive set of user flow as a result. I would highly recommend Envi to anyone. Thanks for all your amazing contribution, Envi!! You rock. :) Ahjeong Yeom Third degree connection MS in Analytics (Data Science) Candidate at the University of Chicago June 30, 2020, Gloria worked with Ahjeong on the same team In total, we spent 3 years working together. During our time working at the consulting company and agency, G&G, AJ has displayed strong work ethic, teamwork attitude, and effective communications. She has also shown our clientele that she is a dependable, capable, and trustworthy professional for being able to manage client-facing communications, overseeing the operations team of the agency, along with leading multiple projects teams to deliver performance on time and with quality.\\n\\nAJ also has the abilities to handle adversities with grace, innovation, and moral value-based principles. She also has a very strong aptitude for technological and data-related work. And, most importantly, she is a leader who also listens to her team and never stops learning on her own initiatives. I truly do recommend AJ, as she will be a great asset to the project, team, and company she is assigned to. Britta Keller Third degree connection Owner, Le Splash Marketing  June 30, 2020, Gloria worked with Britta on the same team I had the privilege to work in the same team with Britta at CFA Institute. Britta was a positive force of light to the team. She excelled in her role due to her discipline, teamwork attitude, and curiosity level, which then led to independent self-learning and skill improvement.\\n\\nTo this day, I still kept in touch with Britta. She is still the same person with unshakeable moral values and work ethics, I would like to provide my highest recommendation here for her, without a doubt! I hope that you also get the chance to work with her.",
        "Honors & awards":
          " #1 Winner of Startup Weekend Issued by Startup Weekend Jakarta, Indonesia · Dec 2018 Associated with GRIT&GLO, LLC I led a team of 8 seasoned professionals and students to secure first place with a startup called 'Mutual' where we created a platform MVP that connects founders with a designer and a developer that share a mutual purpose and vision. It was a fulfilling work experience. We brought home $1,000 cash prize, too. :) Y Combinator Female Founders 2018 Issued by Y Combinator | Hosted in: Seattle, WA · Feb 2018 Associated with GRIT&GLO, LLC Selected as one of very few female founders to attend the female founders summit in Seattle, WA, back in 2018. I was able to learn the in's and out's of idea validation, prototyping, team management, and investments. It was a true honor to apply and get selected as one of the participants to attend YC Female Founders Conference. TED Women 2017 | Group Host Issued by TED | TED Talks | TEDWomen · Nov 2017 Associated with GRIT&GLO, LLC To attend TED live, one must apply. Not all are accepted. Backgrounds are checked and diversity is curated. I was fortunate enough to get screened and accepted to attend TEDWomen 2017, themed 'Bridges'. I also had the opportunity to be a group host during a breakout session, where women CEO's, startup founders, and executives gathered together to do problem-solving exercises. My highlight was being connected to Patty McCord of Netflix.",
        Organizations:
          " Google Developers Group + Women Techmakers San Francisco Advisor | Tech Mentor · Jul 2022 - Present Associated with Bdev.ai Kernel Fellowship (@kernel0x) KB7 Fellow · Jul 2022 - Present Associated with Spero Studios AYEC ASEAN Young Entrepreneurs Council Advisory Board Member, Indonesia Representative · Jan 2021 - Present Associated with Spero Studios",
        Causes:
          " Arts and Culture • Economic Empowerment • Education • Poverty Alleviation • Science and Technology",
        Name: "Gloria",
      },
      receiver: getProfileInfo(),
    },
  };

  // console.log(jsonToSend);

  fetch("https://salesgen.onrender.com/items/", {
    method: "POST",
    body: JSON.stringify(jsonToSend),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      const reader = response.body.getReader();
      return new ReadableStream({
        start(controller) {
          // The following function handles each chunk
          function push() {
            // Read the next chunk
            reader.read().then(({ done, value }) => {
              // End the stream if no more chunks are available
              if (done) {
                controller.close();
                return;
              }
              // Add the current chunk to the stream
              controller.enqueue(value);
              // Call the push function again to read the next chunk
              push();
            });
          }

          // Start reading the chunks
          push();
        },
      });
    })
    .then((stream) => new Response(stream))
    .then((response) => response.json())
    .then((data) => {
      // Access the value of the text field
      console.log(data);
      console.log("this the data");
      const text = data.results;
      console.log("this is the text", text);

      // Update the element on the DOM
      // Split text and update the HTML on the DOM

      // insert results from serverResponse into a div with 2 columns: one for keys, one for values

      // split response on the dash line
      const [outreachText, explanationText] = text.split("-------");

      function splitStringOnSpecialChar(input) {
        return input.split(/(?=•|Rating|\.)/).join("\n");
      }

      const splitExplanationText = splitStringOnSpecialChar(explanationText);

      console.log("the text");
      console.log(outreachText);
      console.log(splitExplanationText);

      console.log("The elements:");
      console.log(textArea);
      console.log(suggestionsDiv);

      // set the text area to our suggested outreach text
      textArea.value = outreachText;
      suggestionsDiv.innerText = splitExplanationText;
    });

  // return res.then((r) => {
  //   return r;
  // });
};

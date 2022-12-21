from fastapi import FastAPI, Body, Depends, HTTPException, status, UploadFile, Request, File
from pydantic import BaseModel#APP defination
import asyncio
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
import time
import threading
import base64
from urllib.parse import urlparse
import urllib
import os, re, sys, json
import pickle
import pandas as pd 
import numpy as np
import time
import os
import openai
import rocketreach

from pydantic import BaseModel

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import *
import os
from twilio.rest import Client

sg = SendGridAPIClient(os.environ.get('SENGRID_API_KEY', default=''))
account_sid = os.environ.get('TWILIO_ACCOUNT_SID', default="")
auth_token = os.environ.get('TWILIO_AUTH_TOKEN', default = "")

# Load your API key from an environment variable or secret management service
openai.api_key = os.environ.get("OPENAI_API_KEY", default='')
ROCKET_API = os.environ.get("ROCKET_API", default='')
rr = rocketreach.Gateway(rocketreach.GatewayConfig(ROCKET_API))


fast_api_key = os.environ.get('FASTAPI_API_KEY', default='')
api_keys = [fast_api_key]
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")  # use token authentication

def api_key_auth(api_key: str = Depends(oauth2_scheme)):
    if api_key not in api_keys:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Forbidden")

#Global variable:
app = FastAPI(debug=True)


origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World from Bladerunner"}


class Data(BaseModel):
    data: dict


@app.post("/test/")
def main(data: Data):
    print ('data', type(data))
    print ('data', data)
    return data


@app.post("/items/")
async def create_item(data: Data):
    print ('data', data)
    json_data = data.data
    try:
        sender_profile = json_data['sender']
        receiver_profile = json_data['receiver']
        similaritiesProfile = {}
        #targets = ['About', 'Organizations', 'Experience', 'Education', 'Skills', 'Causes', 'Volunteering', 'Honors & awards']
        targets = ['About', 'Experience']
        for key in sender_profile:
            if key in targets:
                if len(sender_profile[key]) > 0 and len(receiver_profile[key]) > 0:
                    try:
                        prompt0 = "Find the similarities between these two persona profiles: \n\n" + sender_profile[key].strip() + "\n\n" + receiver_profile[key].strip()
                        response = openai.Completion.create(model="text-davinci-003", prompt=prompt0, temperature=0, max_tokens=2049)
                        similaritiesProfile[key] = response['choices'][0]['text'].strip()
                    except Exception as e:
                        print ("Exception error at similarities profile", str(e))

        pre_prompt1 = "Find the most relevant, recent information, summarize it under 60 characters and remove hashtags of the following text: "
        responses = {}
        targets = ['About']
        for key in receiver_profile:
            if key in targets:
                if len(receiver_profile[key]) > 0:
                    try:
                        prompt1 = pre_prompt1 + receiver_profile[key].strip()
                        response = openai.Completion.create(model="text-davinci-003", prompt=prompt1, temperature=0, max_tokens=80)
                        responses[key] = response['choices'][0]['text'].strip()
                    except Exception as e:
                        print ("Exception error at similarities profile", str(e))
        prompt2 = 'Generate a non-cringy LinkedIn message (maximum 180 characters) coming from {} to {}. Use some complementary comments about this profile "{}"'.format(sender_profile['Name'], receiver_profile['Name'], receiver_profile['Name'], responses['About'])
        if 'About' in similaritiesProfile.keys() and 'Experience' in similaritiesProfile.keys():
            if len(similaritiesProfile['About']) > 0 and len(similaritiesProfile['Experience']) > 0:
                print ('1')
                prompt2 = 'Generate a non-cringy LinkedIn message (maximum 180 characters) coming from {} to {}. Use some complementary comments about this profile "{}" and write it finding commonalities between both of our persona profiles "{}" or "{}"'.format(sender_profile['Name'], receiver_profile['Name'], responses['About'], similaritiesProfile['About'], similaritiesProfile['Experience'])
        elif 'About' in similaritiesProfile.keys():
            if len(similaritiesProfile['About']) > 0:
                print ('2')
                prompt2 = 'Generate a non-cringy LinkedIn message (maximum 180 characters) coming from {} to {}. Use some complementary comments about this profile "{}" and write it finding commonalities between both of our persona profiles "{}"'.format(sender_profile['Name'], receiver_profile['Name'], responses['About'], similaritiesProfile['About'])
        elif 'Experience' in similaritiesProfile.keys():
            if len(similaritiesProfile['Experience']) > 0:
                print ('3')
                prompt2 = 'Generate a non-cringy LinkedIn message (maximum 180 characters) coming from {} to {}. Use some complementary comments about this profile "{}" and write it finding commonalities between both of our persona profiles "{}"'.format(sender_profile['Name'], receiver_profile['Name'], responses['About'], similaritiesProfile['Experience'])
        post_promt2 = "In a bullet point section below, separated by '-------': \n* A one sentence summary explaining why this is effective \n* Explain in detail the pros and cons of this message. \n* Given the pros and cons of this message, give it a percentage rating of the likelihood to receive a response "
        response = openai.Completion.create(model="text-davinci-003", prompt=prompt2 + post_promt2, temperature=0.7, max_tokens=2000)
        message = response['choices'][0]['text'].strip()
        hi_words = ['Hi', 'Hello', 'Hey', 'Greetings', 'Hi there', 'Hello there', 'Hey there', 'Greetings']
        if message.split(" ")[0] in hi_words:
            message = message.split(" ")
            message.pop(0)
            message = ' '.join(message)
        message = message.replace('\n\n', ' ')
        message = message.replace('\n', ' ')
        # try:
        #     result = rr.person.lookup(linkedin_url=receiver_profile['Url'])
        #     try:
        #         if len(result.person.emails) > 0:
        #             for i in result.person.emails:
        #                 if '@hotmail' in i['email']:
        #                     pass
        #                 else:
        #                     pro_email = i['email']
        #                     break   
        #             if len(pro_email) == 0:#if we coudn't find a professional email, get personal email
        #                 for i in result.person.emails:
        #                     if '@gmail' in i['email']:
        #                         pro_email = i['email'] 
        #                         break
        #                     else:
        #                         pro_email = i['email']
        #         print ('pro_email', pro_email)
        #     except Exception as e:
        #         print ("Exception error at email", str(e))

        # except Exception as e:
        #     print ("Exception error at person lookup", str(e))

        # if len(pro_email) > 0:
        #     try:
        #         prompt3 = 'Generate a non-cringy  professional email coming from {} to {}. Use some complementary comments about this profile "{}" and write it finding commonalities between both of our persona profiles "{}", inviting to connect over a 20-minute Zoom call next week '.format(sender_profile['Name'], receiver_profile['Name'], responses['About'], similaritiesProfile['Experience'])
        #         response = openai.Completion.create(model="text-davinci-003", prompt=prompt3, temperature=0.7, max_tokens=2000)
        #         mail_message = Mail(
        #         from_email='no-reply@youtranscription.com',
        #         to_emails=[To(pro_email), To('pdf_youtranscription@mascobot.com')],
        #         subject= receiver_profile['Name'] + ' - ' + sender_profile['Name'],
        #         is_multiple=True,
        #         html_content='<strong>'+ response['choices'][0]['text'])
        #         response = sg.send(mail_message)#send email
        #         print ('email sent')
        #         print(response.status_code, response.body, response.headers)
        #     except Exception as e:
        #         print ("Exception error at email", str(e))

        try:
            prompt4 = 'Generate a non-cringy SMS coming from {} to {}. Use some complementary comments about this profile "{}" and write it politely inviting to connect over a 20-minute Zoom call next week '.format(sender_profile['Name'], receiver_profile['Name'], responses['About'])
            response_sms = openai.Completion.create(model="text-davinci-003", prompt=prompt4, temperature=0.7, max_tokens=2000)
            response_sms = response_sms['choices'][0]['text'].strip()
            client = Client(account_sid, auth_token)

            message_sms = client.messages \
                            .create(
                                body=response_sms,
                                from_='+16603337804',
                                to='+12062096821'
                            )

            print(message_sms.sid)
        except Exception as e:
            print ("Exception error at SMS", str(e))

            

        return {"message": "successful generation", "results": message}
    except Exception as e:
        return {"message": "Exception error BIG ERROR", "error": str(e)}


def remove_emoji(string):
    emoji_pattern = re.compile("["
                               u"\U0001F600-\U0001F64F"  # emoticons
                               u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                               u"\U0001F680-\U0001F6FF"  # transport & map symbols
                               u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                               u"\U00002500-\U00002BEF"  # chinese char
                               u"\U00002702-\U000027B0"
                               u"\U00002702-\U000027B0"
                               u"\U000024C2-\U0001F251"
                               u"\U0001f926-\U0001f937"
                               u"\U00010000-\U0010ffff"
                               u"\u2640-\u2642"
                               u"\u2600-\u2B55"
                               u"\u200d"
                               u"\u23cf"
                               u"\u23e9"
                               u"\u231a"
                               u"\ufe0f"
                               u"\u3030"
                               u"\u2014"
                               "]+", flags=re.UNICODE)
    return emoji_pattern.sub(r'', string)

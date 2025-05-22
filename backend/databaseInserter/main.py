from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import json

driver = webdriver.Firefox()
driver.get("https://www.ticketsmarche.com/Event_filter_grid/Eventlist_filter")

events = driver.find_elements(By.CLASS_NAME, "event-item")

all_events = []
for event in events:
    event_obj = {
        "category_img": "",
        "event-name": "",
        "event-date": "",
        "event-venue": "",
        "event-price": "",
    }

    event_obj["category_img"] = event.find_element(By.CLASS_NAME, "category_image").get_attribute("src")
    
    for event_attr in event_obj.keys():
        if event_attr != "category_img":
            event_obj[event_attr] = event.find_element(By.CLASS_NAME, event_attr).text

    all_events.append(event_obj)

with open("events.json", "w+") as file:
    json.dump(all_events, file, ensure_ascii=False, indent=4)
    file.write("\n")

driver.close()

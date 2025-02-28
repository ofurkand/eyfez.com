# ChatGPT yardımı alındı.

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import json
import time

# Initialize WebDriver
driver = webdriver.Chrome()

# Open the website
driver.get("https://namazvakitleri.diyanet.gov.tr/tr-TR/9541/istanbul-icin-namaz-vakti")  # Wait for the page to load
print("Siteye girildi.")

# Click the first button inside the specific parent div
button1 = driver.find_element(By.XPATH, '//*[@id="vakit-bottom-wrapper"]/div[1]/section/div/div[1]/button[3]')
button1.click()  # Wait for the button click to complete
print("Yıllık Namaz Vaktine girildi.")
time.sleep(3) 

button = driver.find_element(By.XPATH, '//*[@id="yourTable_wrapper"]/div[1]/button[1]')
button.click()
print("Kayıt Sayısına tıklandı.")

# Then, click on the third option inside the second div
time.sleep(3) 
# option_button = driver.find_element(By.XPATH, '//*[@id="yourTable_wrapper"]/div[1]/div[2]/div/button[3]')
option_button = driver.find_element(By.XPATH, '//*[@id="yourTable_wrapper"]/div[1]/div[2]/div/button[4]')
option_button.click()

# Extract all rows from the table body (tbody)
time.sleep(3) 
table_rows = driver.find_elements(By.XPATH, '//*[@id="yourTable"]/tbody/tr')

# Prepare the data as a list of dictionaries
data = []
for row in table_rows:
    columns = row.find_elements(By.TAG_NAME, "td")
    row_data = {
        "imsak": columns[2].text,  # Assuming the first column is the time
        "aksam": columns[-2].text,  # Assuming the second column is the prayer name
    }
    data.append(row_data)

# Save the data as a JSON file
with open("namaz_vakitleri.json", "w", encoding="utf-8") as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=4)

# Print the data
print(json.dumps(data, ensure_ascii=False, indent=4))

# Close the browser
driver.quit()

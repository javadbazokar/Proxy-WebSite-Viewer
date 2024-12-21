# Proxy WebSite Viewer 🌐🔄

This project is a proxy visit script designed to visit a specified URL using proxies and track the number of successful visits. It is intended for use with a file containing proxy addresses, and it handles multiple requests in parallel to simulate traffic. This can be helpful for testing, traffic generation, or as part of a larger automation system.

## Features ✨
- Supports multiple proxies for anonymous browsing 🕵️‍♂️
- Validates successful visits with HTML content checks ✅
- Tracks the number of successful and failed visits 📊
- Saves proxy data in a `assets/valid_proxies.txt` file 📝
- Stores URL visit counts in a `asstes/database.json` file 🗃️

## How It Works 🔧

1. **Upload a Proxy File**: 
   You can upload a text file containing proxies, with one proxy per line.

2. **Enter the Target URL**: 
   Provide the URL where you want the proxy visits to happen.

3. **Set the Visit Limit**: 
   Specify how many visits you want to make. The script ensures the visit count is a multiple of 5.

4. **Start the Visits**: 
   Click the **Start Visit** button to begin the process. The script will use the proxies to visit the URL and track how many times the page loads successfully.

5. **Track Progress**: 
   The script shows the number of successful and failed visits, as well as the total requests made.

## Installation 📥

To run this script locally, follow these steps:

1. **Clone the Repository or Download the Repository zip File**:

   ```bash
   git clone https://github.com/yourusername/proxy-visit-script.git
   cd proxy-visit-script
   ```

2. **Set up the PHP Environment**:
   Make sure you have a PHP environment set up on your local machine (you can use tools like XAMPP or MAMP).

3. **Configure the Script**:
   No additional configuration is needed. Just make sure your PHP server is running.

4. **Start Using the Script**:
   Open the `index.html` file in your browser to interact with the script.

## Usage Instructions 📝

### 1. Upload a Proxy File
   Upload a `.txt` file containing proxies. Each line should represent one proxy.

### 2. Set the Target URL
   Enter the URL that you want to visit with the proxies.

### 3. Specify the Visit Limit
   Enter a number of visits. The number must be a multiple of 100.

### 4. Start the Process
   Click the **Start Visit** button to begin. The script will loop through the proxies and visit the URL. 

### 5. Monitor the Visits
   You can track the success and failure count for each proxy and the total number of visits.

## Notes ⚠️
- Ensure that you are using valid proxies, as invalid ones may result in failed visits.
- The script checks if the page contains HTML tags (like `<html>`, `<head>`, or `<body>`) to confirm successful visits.

## Contributing 🤝

Feel free to fork this repository, contribute to it, or open issues if you encounter bugs or have ideas for improvements. 

## License 📝

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact 📧
For questions or support, please open an issue in the repository or contact me at: [jbazokar@gmail.com](mailto:jbazokar@gmail.com)

---

Enjoy using the Proxy WebSite Viewer 🚀

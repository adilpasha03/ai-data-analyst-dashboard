# 🚀 AI Data Analyst Dashboard

## 📊 Overview

The **AI Data Analyst Dashboard** is a full-stack web application that allows users to upload CSV files and analyze data using natural language queries.

Users can simply ask questions like:

* "Top 5 products"
* "Total sales"
* "Average revenue"

The system processes the data and provides:

* 📈 Visual charts
* 📊 Key insights
* 📋 Tabular data

---

## 🎯 Features

### 📂 Data Upload

* Upload CSV files dynamically
* Supports any dataset with flexible column names
* Automatic column normalization (case-insensitive)

### 📊 Data Visualization

* Bar charts using Recharts
* Dynamic chart rendering based on uploaded data

### 📈 Analytics

* Top N records
* Total calculations
* Average calculations
* Works for any numeric column

### 🤖 AI Integration

* Natural language query support
* Converts user queries into structured JSON
* Supports queries like:

  * "Top 3 products"
  * "Total sales"
  * "Average revenue"

### 🧠 Smart Data Handling

* Detects numeric columns automatically
* Handles different column names (sales, revenue, profit)
* Works with any CSV format

---

## 🏗️ Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Recharts

### Backend

* Node.js
* Express.js

### AI Layer

* Google Gemini API (with fallback handling)

### Data Processing

* PapaParse (CSV parsing)

---

## 🧩 Project Structure

```
ai-dashboard/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
│
├── backend/
│   ├── routes/
│   │   ├── upload.js
│   │   └── ai.js
│   ├── server.js
│   └── .env
```

---

## ⚙️ How It Works

1. User uploads CSV file
2. Backend parses data using PapaParse
3. Data is normalized (lowercase keys)
4. User enters query
5. AI converts query → structured JSON
6. Backend processes data
7. Results displayed as:

   * Charts
   * Cards
   * Table

---

## 🚀 Getting Started

### 🔧 Installation

#### 1. Clone Repository

```bash
git clone https://github.com/your-username/ai-data-analyst-dashboard.git
cd ai-data-analyst-dashboard
```

---

#### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

#### 3. Setup Backend

```bash
cd backend
npm install
node server.js
```

---

### 🔑 Environment Variables

Create a `.env` file in backend:

```env
GEMINI_API_KEY=your_api_key_here
```

---

## 🧪 Example CSV Format

Works with ANY CSV like:

```csv
product,sales,region
A,100,North
B,200,South
```

OR

```csv
name,revenue,city
X,5000,NY
Y,7000,LA
```

---

## 📸 Screenshots

* Dashboard UI
* Chart Visualization
* CSV Upload
* AI Query Input

(Add screenshots here)

---

## 💡 Future Enhancements

* 🔐 Authentication (JWT)
* 📁 Multiple file support
* 📄 Export reports (PDF/Excel)
* 📊 More chart types (Pie, Line)
* 🤖 Advanced AI insights

---

## ⭐ Industry Relevance

This project demonstrates:

* Full-stack development
* AI integration
* Data visualization
* Real-world analytics system

Similar tools:

* Power BI
* Tableau
* AI-driven analytics platforms

---

## 👨‍💻 Author

**Your Name**

* GitHub: https://github.com/adilpasha03
* LinkedIn: (optional)

---

## 📄 License

This project is open-source and available under the MIT License.

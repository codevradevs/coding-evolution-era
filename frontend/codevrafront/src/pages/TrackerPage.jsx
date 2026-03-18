import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Flame, BarChart3, BookOpen, CheckCircle, Lock, Award, Play, ChevronRight, Code2, Server, Shield, Brain, Cpu, Upload, Send, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';

const projectTasks = {
  frontend: [
    { id: 1, title: 'Responsive Portfolio Website', description: 'Build a fully responsive portfolio website with:\n- Modern design using Flexbox/Grid\n- Mobile-first approach\n- Smooth animations\n- Contact form\n- Dark/Light theme toggle\n\nSubmit: GitHub repo link + live demo URL', xp: 200 },
    { id: 2, title: 'React Todo App with LocalStorage', description: 'Create a React todo application with:\n- Add, edit, delete todos\n- Mark as complete\n- Filter (All, Active, Completed)\n- Persist data in localStorage\n- Clean UI with Tailwind CSS\n\nSubmit: GitHub repo link + live demo URL', xp: 200 },
    { id: 3, title: 'Weather Dashboard', description: 'Build a weather dashboard using:\n- OpenWeather API integration\n- Search by city\n- Display current weather + 5-day forecast\n- Responsive design\n- Error handling\n\nSubmit: GitHub repo link + live demo URL', xp: 200 },
    { id: 4, title: 'E-commerce Product Page', description: 'Create a product page with:\n- Image gallery with zoom\n- Size/color selection\n- Add to cart functionality\n- Quantity selector\n- Responsive layout\n\nSubmit: GitHub repo link + live demo URL', xp: 200 },
    { id: 5, title: 'Interactive Quiz App', description: 'Build a quiz application with:\n- Multiple choice questions\n- Timer functionality\n- Score calculation\n- Results page with review\n- Progress indicator\n\nSubmit: GitHub repo link + live demo URL', xp: 200 }
  ],
  backend: [
    { id: 1, title: 'RESTful API with Authentication', description: 'Build a REST API with:\n- User registration/login (JWT)\n- CRUD operations for resources\n- Input validation\n- Error handling\n- MongoDB/PostgreSQL database\n\nSubmit: GitHub repo + API documentation + Postman collection', xp: 200 },
    { id: 2, title: 'Blog API with Comments', description: 'Create a blog API with:\n- Posts CRUD\n- Comments system\n- User authentication\n- Pagination\n- Search functionality\n\nSubmit: GitHub repo + API documentation', xp: 200 },
    { id: 3, title: 'File Upload Service', description: 'Build a file upload service with:\n- Multiple file upload\n- File type validation\n- Cloud storage (AWS S3/Cloudinary)\n- Download functionality\n- User file management\n\nSubmit: GitHub repo + deployment link', xp: 200 },
    { id: 4, title: 'Real-time Chat API', description: 'Create a chat API using:\n- WebSocket/Socket.io\n- Real-time messaging\n- User authentication\n- Message history\n- Online status\n\nSubmit: GitHub repo + demo video', xp: 200 },
    { id: 5, title: 'E-commerce Backend', description: 'Build an e-commerce backend with:\n- Product management\n- Shopping cart\n- Order processing\n- Payment integration (Stripe/M-Pesa)\n- Admin dashboard API\n\nSubmit: GitHub repo + API documentation', xp: 200 }
  ],
  security: [
    { id: 1, title: 'Vulnerability Scanner', description: 'Create a web vulnerability scanner that:\n- Scans for SQL injection\n- Detects XSS vulnerabilities\n- Checks security headers\n- Tests for CSRF protection\n- Generates security report\n\nSubmit: GitHub repo + sample scan report', xp: 200 },
    { id: 2, title: 'Secure Authentication System', description: 'Build a secure auth system with:\n- Password hashing (bcrypt)\n- JWT with refresh tokens\n- Rate limiting\n- MFA (2FA)\n- Account lockout\n\nSubmit: GitHub repo + security documentation', xp: 200 },
    { id: 3, title: 'Encryption Tool', description: 'Create an encryption/decryption tool with:\n- AES-256 encryption\n- RSA key generation\n- File encryption\n- Secure key storage\n- CLI interface\n\nSubmit: GitHub repo + usage guide', xp: 200 },
    { id: 4, title: 'Security Audit Report', description: 'Perform security audit on a web app:\n- Identify OWASP Top 10 vulnerabilities\n- Test authentication/authorization\n- Check for sensitive data exposure\n- Provide remediation steps\n- Write detailed report\n\nSubmit: PDF report + proof of findings', xp: 200 },
    { id: 5, title: 'Password Manager', description: 'Build a secure password manager with:\n- Master password protection\n- AES encryption\n- Password generation\n- Secure storage\n- Auto-fill capability\n\nSubmit: GitHub repo + security analysis', xp: 200 }
  ],
  ai: [
    { id: 1, title: 'Image Classification Model', description: 'Build an image classifier that:\n- Uses CNN architecture\n- Classifies 10+ categories\n- Achieves 85%+ accuracy\n- Includes data augmentation\n- Provides predictions with confidence\n\nSubmit: Jupyter notebook + trained model + results', xp: 200 },
    { id: 2, title: 'Sentiment Analysis API', description: 'Create a sentiment analysis API that:\n- Analyzes text sentiment (positive/negative/neutral)\n- Uses NLP techniques\n- REST API endpoint\n- Handles multiple languages\n- Returns confidence scores\n\nSubmit: GitHub repo + API demo + accuracy metrics', xp: 200 },
    { id: 3, title: 'Recommendation System', description: 'Build a recommendation engine that:\n- Collaborative filtering\n- Content-based filtering\n- Hybrid approach\n- Handles cold start problem\n- Evaluates with metrics\n\nSubmit: Jupyter notebook + implementation + evaluation', xp: 200 },
    { id: 4, title: 'Chatbot with NLP', description: 'Create an intelligent chatbot that:\n- Understands user intent\n- Provides relevant responses\n- Handles context\n- Uses pre-trained models\n- Web interface\n\nSubmit: GitHub repo + demo video + conversation examples', xp: 200 },
    { id: 5, title: 'Object Detection System', description: 'Build an object detection system that:\n- Detects multiple objects in images\n- Uses YOLO or similar\n- Real-time detection\n- Bounding boxes with labels\n- Video processing capability\n\nSubmit: GitHub repo + demo video + performance metrics', xp: 200 }
  ],
  ml: [
    { id: 1, title: 'End-to-End ML Pipeline', description: 'Build a complete ML pipeline with:\n- Data preprocessing\n- Feature engineering\n- Model training with cross-validation\n- Hyperparameter tuning\n- Model deployment (Flask/FastAPI)\n\nSubmit: GitHub repo + deployed API + documentation', xp: 200 },
    { id: 2, title: 'Time Series Forecasting', description: 'Create a forecasting model that:\n- Predicts future values\n- Handles seasonality and trend\n- Uses ARIMA/LSTM\n- Evaluates with RMSE/MAE\n- Visualizes predictions\n\nSubmit: Jupyter notebook + results + visualizations', xp: 200 },
    { id: 3, title: 'Imbalanced Classification', description: 'Solve an imbalanced dataset problem:\n- Apply SMOTE/undersampling\n- Use ensemble methods\n- Optimize for F1-score\n- Handle class weights\n- Compare multiple approaches\n\nSubmit: Jupyter notebook + comparison report', xp: 200 },
    { id: 4, title: 'Model Interpretability Dashboard', description: 'Build an interpretability dashboard with:\n- SHAP values visualization\n- Feature importance plots\n- Partial dependence plots\n- Interactive web interface\n- Multiple model support\n\nSubmit: GitHub repo + demo + screenshots', xp: 200 },
    { id: 5, title: 'AutoML System', description: 'Create an automated ML system that:\n- Tries multiple algorithms\n- Performs hyperparameter tuning\n- Selects best model\n- Generates performance report\n- Exports trained model\n\nSubmit: GitHub repo + example runs + documentation', xp: 200 }
  ]
};

const mlLessons = [
  { id: 1, title: 'ML Pipeline Overview', content: 'Understanding the complete machine learning workflow.\n\nPipeline Steps:\n1. Problem Definition: Classification/Regression\n2. Data Collection: Gather relevant data\n3. Data Preprocessing: Clean and prepare\n4. Feature Engineering: Create meaningful features\n5. Model Selection: Choose algorithm\n6. Training: Fit model to data\n7. Evaluation: Test performance\n8. Deployment: Production use\n\nExample:\nfrom sklearn.pipeline import Pipeline\npipeline = Pipeline([(\'\'scaler\'\', StandardScaler()), (\'\'model\'\', LogisticRegression())])\npipeline.fit(X_train, y_train)', xp: 10 },
  { id: 2, title: 'Feature Engineering', content: 'Create and select features to improve model performance.\n\nTechniques:\n- Feature Creation: Combine existing features\n- Polynomial Features: x^2, x^3\n- Binning: Discretize continuous variables\n- One-Hot Encoding: Categorical to binary\n- Feature Selection: Remove irrelevant features\n\nExample:\nfrom sklearn.preprocessing import PolynomialFeatures\npoly = PolynomialFeatures(degree=2)\nX_poly = poly.fit_transform(X)\n# Creates x1, x2, x1^2, x1*x2, x2^2', xp: 15 },
  { id: 3, title: 'Cross-Validation', content: 'Validate model performance using multiple data splits.\n\nMethods:\n- K-Fold: Split into K parts\n- Stratified K-Fold: Preserve class distribution\n- Leave-One-Out: N-1 training, 1 test\n- Time Series Split: Respect temporal order\n\nExample:\nfrom sklearn.model_selection import cross_val_score\nscores = cross_val_score(model, X, y, cv=5)\nprint(f\'\'Mean: {scores.mean()}, Std: {scores.std()}\'\')\n# 5-fold cross-validation', xp: 20 },
  { id: 4, title: 'Hyperparameter Tuning', content: 'Optimize model parameters for best performance.\n\nMethods:\n- Grid Search: Try all combinations\n- Random Search: Random sampling\n- Bayesian Optimization: Smart search\n- Hyperband: Adaptive resource allocation\n\nExample:\nfrom sklearn.model_selection import GridSearchCV\nparam_grid = {\'\'C\'\': [0.1, 1, 10], \'\'kernel\'\': [\'\'linear\'\', \'\'rbf\'\']]}\ngrid = GridSearchCV(SVC(), param_grid, cv=5)\ngrid.fit(X_train, y_train)\nprint(grid.best_params_)', xp: 25 },
  { id: 5, title: 'Ensemble Methods', content: 'Combine multiple models for better predictions.\n\nTechniques:\n- Bagging: Bootstrap Aggregating (Random Forest)\n- Boosting: Sequential learning (XGBoost, AdaBoost)\n- Stacking: Meta-model on predictions\n- Voting: Majority vote or average\n\nExample:\nfrom sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier\nfrom sklearn.ensemble import VotingClassifier\nvoting = VotingClassifier([\n  (\'\'rf\'\', RandomForestClassifier()),\n  (\'\'gb\'\', GradientBoostingClassifier())\n])\nvoting.fit(X_train, y_train)', xp: 25 },
  { id: 6, title: 'Handling Imbalanced Data', content: 'Deal with datasets where classes are not equally represented.\n\nTechniques:\n- Oversampling: SMOTE (Synthetic Minority)\n- Undersampling: Remove majority samples\n- Class Weights: Penalize misclassification\n- Ensemble Methods: Balanced Random Forest\n- Anomaly Detection: Treat minority as anomaly\n\nExample:\nfrom imblearn.over_sampling import SMOTE\nsmote = SMOTE()\nX_resampled, y_resampled = smote.fit_resample(X_train, y_train)\nmodel.fit(X_resampled, y_resampled)', xp: 30 },
  { id: 7, title: 'Time Series Forecasting', content: 'Predict future values based on historical data.\n\nConcepts:\n- Trend: Long-term direction\n- Seasonality: Repeating patterns\n- Stationarity: Constant mean/variance\n- Autocorrelation: Correlation with past values\n- ARIMA: AutoRegressive Integrated Moving Average\n\nExample:\nfrom statsmodels.tsa.arima.model import ARIMA\nmodel = ARIMA(data, order=(1,1,1))\nmodel_fit = model.fit()\nforecast = model_fit.forecast(steps=10)', xp: 30 },
  { id: 8, title: 'Dimensionality Reduction', content: 'Reduce number of features while preserving information.\n\nMethods:\n- PCA: Principal Component Analysis\n- t-SNE: t-Distributed Stochastic Neighbor Embedding\n- LDA: Linear Discriminant Analysis\n- Autoencoders: Neural network compression\n- Feature Selection: Remove low-importance features\n\nExample:\nfrom sklearn.decomposition import PCA\npca = PCA(n_components=2)\nX_reduced = pca.fit_transform(X)\nprint(f\'\'Variance explained: {pca.explained_variance_ratio_}\'\')\n# Reduce to 2 dimensions', xp: 30 },
  { id: 9, title: 'Model Interpretability', content: 'Understand and explain model predictions.\n\nTechniques:\n- Feature Importance: Which features matter\n- SHAP: SHapley Additive exPlanations\n- LIME: Local Interpretable Model-agnostic\n- Partial Dependence Plots\n- Permutation Importance\n\nExample:\nimport shap\nexplainer = shap.TreeExplainer(model)\nshap_values = explainer.shap_values(X_test)\nshap.summary_plot(shap_values, X_test)\n# Visualize feature contributions', xp: 35 },
  { id: 10, title: 'MLOps & Production', content: 'Deploy and maintain ML models in production.\n\nPractices:\n- Version Control: Track model versions\n- CI/CD: Automated testing and deployment\n- Monitoring: Track model performance\n- A/B Testing: Compare model versions\n- Model Registry: Centralized model storage\n- Retraining: Update with new data\n\nExample:\nimport mlflow\nwith mlflow.start_run():\n  mlflow.log_param(\'\'n_estimators\'\', 100)\n  mlflow.log_metric(\'\'accuracy\'\', 0.95)\n  mlflow.sklearn.log_model(model, \'\'model\'\')\n# Track experiments', xp: 35 }
];

const mlQuiz = [
  { q: 'What is the first step in ML pipeline?', opts: ['Training', 'Problem Definition', 'Deployment', 'Testing'], ans: 1 },
  { q: 'What is feature engineering?', opts: ['Model training', 'Creating meaningful features', 'Data collection', 'Model deployment'], ans: 1 },
  { q: 'What does one-hot encoding do?', opts: ['Scale features', 'Convert categorical to binary', 'Remove outliers', 'Normalize data'], ans: 1 },
  { q: 'What are polynomial features?', opts: ['Linear features', 'x^2, x^3, etc.', 'Categorical features', 'Binary features'], ans: 1 },
  { q: 'What is K-Fold cross-validation?', opts: ['Single split', 'Split into K parts', 'No validation', 'Random split'], ans: 1 },
  { q: 'Why use cross-validation?', opts: ['Faster training', 'Better performance estimate', 'Less data needed', 'Simpler code'], ans: 1 },
  { q: 'What is stratified K-Fold?', opts: ['Random split', 'Preserve class distribution', 'Time-based split', 'No split'], ans: 1 },
  { q: 'What is Grid Search?', opts: ['Random search', 'Try all parameter combinations', 'Single parameter', 'No search'], ans: 1 },
  { q: 'What is hyperparameter tuning?', opts: ['Train model', 'Optimize model parameters', 'Collect data', 'Deploy model'], ans: 1 },
  { q: 'Which is faster: Grid or Random Search?', opts: ['Grid Search', 'Random Search', 'Same speed', 'Neither'], ans: 1 },
  { q: 'What is bagging?', opts: ['Sequential learning', 'Bootstrap Aggregating', 'Single model', 'No ensemble'], ans: 1 },
  { q: 'What is boosting?', opts: ['Parallel learning', 'Sequential learning', 'Random learning', 'No learning'], ans: 1 },
  { q: 'Which is an ensemble method?', opts: ['Linear Regression', 'Random Forest', 'K-Means', 'PCA'], ans: 1 },
  { q: 'What does XGBoost use?', opts: ['Bagging', 'Boosting', 'Stacking', 'Voting'], ans: 1 },
  { q: 'What is SMOTE?', opts: ['Undersampling', 'Oversampling technique', 'Feature scaling', 'Model type'], ans: 1 },
  { q: 'How to handle imbalanced data?', opts: ['Ignore it', 'Use SMOTE or class weights', 'Remove data', 'Add more features'], ans: 1 },
  { q: 'What are class weights?', opts: ['Feature weights', 'Penalize misclassification', 'Data weights', 'Model weights'], ans: 1 },
  { q: 'What is time series?', opts: ['Random data', 'Sequential data over time', 'Categorical data', 'Image data'], ans: 1 },
  { q: 'What is stationarity?', opts: ['Changing mean', 'Constant mean/variance', 'No data', 'Random data'], ans: 1 },
  { q: 'What does ARIMA stand for?', opts: ['Auto Regression Integrated Moving Average', 'Artificial Regression Model', 'Advanced Regression Method', 'Automated Regression'], ans: 0 },
  { q: 'What is PCA?', opts: ['Classification', 'Dimensionality reduction', 'Clustering', 'Regression'], ans: 1 },
  { q: 'What does PCA preserve?', opts: ['All features', 'Maximum variance', 'Minimum variance', 'Random features'], ans: 1 },
  { q: 'What is t-SNE used for?', opts: ['Classification', 'Visualization', 'Regression', 'Clustering'], ans: 1 },
  { q: 'Why reduce dimensions?', opts: ['More features', 'Reduce complexity and overfitting', 'Slower training', 'Worse performance'], ans: 1 },
  { q: 'What is SHAP?', opts: ['Model type', 'Explainability method', 'Algorithm', 'Database'], ans: 1 },
  { q: 'What is feature importance?', opts: ['Feature values', 'Which features matter most', 'Feature count', 'Feature names'], ans: 1 },
  { q: 'Why is model interpretability important?', opts: ['Faster training', 'Trust and debugging', 'More accuracy', 'Less data'], ans: 1 },
  { q: 'What is MLOps?', opts: ['ML Operations/Production practices', 'ML Algorithm', 'ML Library', 'ML Model'], ans: 0 },
  { q: 'What is model monitoring?', opts: ['Training', 'Track production performance', 'Data collection', 'Feature engineering'], ans: 1 },
  { q: 'What is A/B testing in ML?', opts: ['Training method', 'Compare model versions', 'Data split', 'Feature selection'], ans: 1 }
];

const aiLessons = [
  { id: 1, title: 'AI & ML Fundamentals', content: 'Introduction to Artificial Intelligence and Machine Learning.\n\nKey Concepts:\n- AI: Machines mimicking human intelligence\n- ML: Learning from data without explicit programming\n- Deep Learning: Neural networks with multiple layers\n- Supervised vs Unsupervised Learning\n- Training, Validation, Testing\n\nTypes:\n- Classification: Categorize data\n- Regression: Predict continuous values\n- Clustering: Group similar data', xp: 10 },
  { id: 2, title: 'Python for AI', content: 'Python is the primary language for AI/ML.\n\nEssential Libraries:\n- NumPy: Numerical computing\n- Pandas: Data manipulation\n- Matplotlib: Data visualization\n- Scikit-learn: ML algorithms\n- TensorFlow/PyTorch: Deep learning\n\nExample:\nimport numpy as np\nimport pandas as pd\ndata = pd.read_csv(\'data.csv\')\nX = data.drop(\'target\', axis=1)\ny = data[\'target\']', xp: 15 },
  { id: 3, title: 'Data Preprocessing', content: 'Prepare data for machine learning models.\n\nSteps:\n- Data Cleaning: Handle missing values\n- Feature Scaling: Normalize/Standardize\n- Encoding: Convert categorical to numerical\n- Train-Test Split: 80/20 or 70/30\n- Feature Engineering\n\nExample:\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\nscaler = StandardScaler()\nX_train = scaler.fit_transform(X_train)', xp: 20 },
  { id: 4, title: 'Supervised Learning', content: 'Learn from labeled data to make predictions.\n\nAlgorithms:\n- Linear Regression: Predict continuous values\n- Logistic Regression: Binary classification\n- Decision Trees: Tree-based decisions\n- Random Forest: Ensemble of trees\n- SVM: Support Vector Machines\n\nExample:\nfrom sklearn.linear_model import LogisticRegression\nmodel = LogisticRegression()\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\naccuracy = model.score(X_test, y_test)', xp: 25 },
  { id: 5, title: 'Unsupervised Learning', content: 'Find patterns in unlabeled data.\n\nAlgorithms:\n- K-Means: Clustering algorithm\n- Hierarchical Clustering\n- DBSCAN: Density-based clustering\n- PCA: Dimensionality reduction\n- Anomaly Detection\n\nExample:\nfrom sklearn.cluster import KMeans\nkmeans = KMeans(n_clusters=3)\nkmeans.fit(X)\nlabels = kmeans.predict(X)\ncenters = kmeans.cluster_centers_', xp: 25 },
  { id: 6, title: 'Neural Networks', content: 'Networks inspired by biological neurons.\n\nComponents:\n- Input Layer: Receives data\n- Hidden Layers: Process information\n- Output Layer: Produces result\n- Activation Functions: ReLU, Sigmoid, Tanh\n- Backpropagation: Update weights\n\nExample:\nimport tensorflow as tf\nmodel = tf.keras.Sequential([\n  tf.keras.layers.Dense(64, activation=\'relu\'),\n  tf.keras.layers.Dense(10, activation=\'softmax\')\n])\nmodel.compile(optimizer=\'adam\', loss=\'sparse_categorical_crossentropy\')\nmodel.fit(X_train, y_train, epochs=10)', xp: 30 },
  { id: 7, title: 'Deep Learning', content: 'Neural networks with multiple hidden layers.\n\nArchitectures:\n- CNN: Convolutional Neural Networks (images)\n- RNN: Recurrent Neural Networks (sequences)\n- LSTM: Long Short-Term Memory\n- Transformer: Attention mechanism\n- GAN: Generative Adversarial Networks\n\nCNN Example:\nmodel = tf.keras.Sequential([\n  tf.keras.layers.Conv2D(32, (3,3), activation=\'relu\'),\n  tf.keras.layers.MaxPooling2D((2,2)),\n  tf.keras.layers.Flatten(),\n  tf.keras.layers.Dense(10, activation=\'softmax\')\n])', xp: 30 },
  { id: 8, title: 'Model Evaluation', content: 'Assess model performance.\n\nMetrics:\n- Accuracy: Correct predictions / Total\n- Precision: True Positives / (TP + FP)\n- Recall: True Positives / (TP + FN)\n- F1 Score: Harmonic mean of precision/recall\n- Confusion Matrix\n- ROC Curve & AUC\n\nExample:\nfrom sklearn.metrics import accuracy_score, classification_report\naccuracy = accuracy_score(y_test, predictions)\nreport = classification_report(y_test, predictions)', xp: 30 },
  { id: 9, title: 'Natural Language Processing', content: 'Process and analyze human language.\n\nTechniques:\n- Tokenization: Split text into words\n- Stemming/Lemmatization: Root words\n- TF-IDF: Term frequency\n- Word Embeddings: Word2Vec, GloVe\n- Transformers: BERT, GPT\n\nExample:\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nvectorizer = TfidfVectorizer()\nX = vectorizer.fit_transform(documents)\n# Use with classifier\nmodel.fit(X, labels)', xp: 35 },
  { id: 10, title: 'AI Model Deployment', content: 'Deploy ML models to production.\n\nMethods:\n- REST API: Flask, FastAPI\n- Cloud: AWS SageMaker, Google AI Platform\n- Edge: TensorFlow Lite, ONNX\n- Containers: Docker\n- Monitoring: Track performance\n\nExample:\nfrom flask import Flask, request\nimport joblib\napp = Flask(__name__)\nmodel = joblib.load(\'model.pkl\')\n@app.route(\'/predict\', methods=[\'POST\'])\ndef predict():\n  data = request.json\n  prediction = model.predict([data[\'features\']])\n  return {\'prediction\': int(prediction[0])}', xp: 35 }
];

const aiQuiz = [
  { q: 'What does AI stand for?', opts: ['Artificial Intelligence', 'Automated Information', 'Advanced Integration', 'Applied Intelligence'], ans: 0 },
  { q: 'What is Machine Learning?', opts: ['Programming rules', 'Learning from data', 'Manual coding', 'Database queries'], ans: 1 },
  { q: 'Which is supervised learning?', opts: ['K-Means', 'PCA', 'Linear Regression', 'DBSCAN'], ans: 2 },
  { q: 'What is the main Python library for numerical computing?', opts: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'], ans: 1 },
  { q: 'Which library is used for deep learning?', opts: ['Pandas', 'NumPy', 'TensorFlow', 'Matplotlib'], ans: 2 },
  { q: 'What does data normalization do?', opts: ['Remove data', 'Scale features to similar range', 'Add data', 'Delete outliers'], ans: 1 },
  { q: 'What is a typical train-test split ratio?', opts: ['50/50', '80/20', '90/10', '60/40'], ans: 1 },
  { q: 'Which handles missing values?', opts: ['Ignore them', 'Imputation or removal', 'Add more data', 'Change algorithm'], ans: 1 },
  { q: 'What is Linear Regression used for?', opts: ['Classification', 'Clustering', 'Predicting continuous values', 'Dimensionality reduction'], ans: 2 },
  { q: 'Which is a classification algorithm?', opts: ['Linear Regression', 'Logistic Regression', 'K-Means', 'PCA'], ans: 1 },
  { q: 'What is Random Forest?', opts: ['Single tree', 'Ensemble of trees', 'Neural network', 'Clustering method'], ans: 1 },
  { q: 'What does SVM stand for?', opts: ['Simple Vector Machine', 'Support Vector Machine', 'Supervised Vector Model', 'Standard Vector Method'], ans: 1 },
  { q: 'What is K-Means?', opts: ['Classification', 'Regression', 'Clustering', 'Dimensionality reduction'], ans: 2 },
  { q: 'What does PCA do?', opts: ['Classification', 'Clustering', 'Reduce dimensions', 'Regression'], ans: 2 },
  { q: 'Which is unsupervised learning?', opts: ['Linear Regression', 'Logistic Regression', 'K-Means', 'Decision Trees'], ans: 2 },
  { q: 'What is a neural network inspired by?', opts: ['Computers', 'Biological neurons', 'Algorithms', 'Databases'], ans: 1 },
  { q: 'What is an activation function?', opts: ['Input data', 'Introduces non-linearity', 'Output layer', 'Loss function'], ans: 1 },
  { q: 'Which activation function is most common?', opts: ['Sigmoid', 'ReLU', 'Tanh', 'Linear'], ans: 1 },
  { q: 'What is backpropagation?', opts: ['Forward pass', 'Update weights', 'Input data', 'Output prediction'], ans: 1 },
  { q: 'What does CNN stand for?', opts: ['Central Neural Network', 'Convolutional Neural Network', 'Complex Neural Network', 'Continuous Neural Network'], ans: 1 },
  { q: 'What are CNNs best for?', opts: ['Text', 'Images', 'Audio', 'Tables'], ans: 1 },
  { q: 'What does RNN stand for?', opts: ['Random Neural Network', 'Recurrent Neural Network', 'Recursive Neural Network', 'Regular Neural Network'], ans: 1 },
  { q: 'What are RNNs good for?', opts: ['Images', 'Sequences', 'Tables', 'Static data'], ans: 1 },
  { q: 'What is accuracy?', opts: ['TP / (TP + FP)', 'Correct / Total', 'TP / (TP + FN)', 'TN / Total'], ans: 1 },
  { q: 'What is precision?', opts: ['TP / (TP + FP)', 'TP / (TP + FN)', 'Correct / Total', 'TN / Total'], ans: 0 },
  { q: 'What is recall?', opts: ['TP / (TP + FP)', 'TP / (TP + FN)', 'Correct / Total', 'TN / Total'], ans: 1 },
  { q: 'What does NLP stand for?', opts: ['Natural Language Processing', 'Neural Language Programming', 'Network Language Protocol', 'New Language Parser'], ans: 0 },
  { q: 'What is tokenization?', opts: ['Encrypt text', 'Split text into words', 'Translate text', 'Compress text'], ans: 1 },
  { q: 'Which is a word embedding technique?', opts: ['TF-IDF', 'Word2Vec', 'Tokenization', 'Stemming'], ans: 1 },
  { q: 'How to deploy ML models?', opts: ['Keep in notebook', 'REST API', 'Email', 'Print results'], ans: 1 }
];

const securityLessons = [
  { id: 1, title: 'Security Fundamentals', content: 'Core principles of cybersecurity.\n\nKey Concepts:\n- CIA Triad: Confidentiality, Integrity, Availability\n- Defense in Depth: Multiple security layers\n- Least Privilege: Minimum access rights\n- Zero Trust: Never trust, always verify\n- Security by Design\n\nExample:\n// Principle of Least Privilege\nconst user = { role: \'viewer\', permissions: [\'read\'] };\nif (user.permissions.includes(\'write\')) {\n  // Allow write\n}', xp: 10 },
  { id: 2, title: 'OWASP Top 10', content: 'The 10 most critical web application security risks.\n\n2021 List:\n1. Broken Access Control\n2. Cryptographic Failures\n3. Injection\n4. Insecure Design\n5. Security Misconfiguration\n6. Vulnerable Components\n7. Authentication Failures\n8. Data Integrity Failures\n9. Logging Failures\n10. SSRF\n\nEach represents common vulnerabilities found in web apps.', xp: 15 },
  { id: 3, title: 'SQL Injection', content: 'SQL Injection occurs when untrusted data is sent to an interpreter.\n\nVulnerable Code:\nconst query = `SELECT * FROM users WHERE id = ${userId}`;\n// Attacker sends: 1 OR 1=1\n\nSecure Code:\nconst query = \'SELECT * FROM users WHERE id = ?\';\ndb.query(query, [userId]); // Parameterized query\n\nPrevention:\n- Use prepared statements\n- Input validation\n- Escape special characters\n- Least privilege DB access', xp: 20 },
  { id: 4, title: 'XSS Attacks', content: 'Cross-Site Scripting (XSS) injects malicious scripts into web pages.\n\nTypes:\n- Stored XSS: Saved in database\n- Reflected XSS: In URL/input\n- DOM-based XSS: Client-side\n\nVulnerable:\nres.send(`<h1>Hello ${username}</h1>`);\n\nSecure:\nconst escape = (str) => str.replace(/[&<>"\'/]/g, (c) => ({\n  \'&\': \'&amp;\', \'<\': \'&lt;\', \'>\': \'&gt;\'\n}[c]));\nres.send(`<h1>Hello ${escape(username)}</h1>`);', xp: 20 },
  { id: 5, title: 'CSRF Protection', content: 'Cross-Site Request Forgery tricks users into executing unwanted actions.\n\nAttack Example:\n<img src="https://bank.com/transfer?to=attacker&amount=1000">\n\nPrevention:\n- CSRF Tokens: Unique per session\n- SameSite Cookies: Lax or Strict\n- Double Submit Cookie\n- Custom Headers\n\nImplementation:\nconst csrf = require(\'csurf\');\napp.use(csrf({ cookie: true }));\napp.get(\'/form\', (req, res) => {\n  res.render(\'form\', { csrfToken: req.csrfToken() });\n});', xp: 25 },
  { id: 6, title: 'Authentication Security', content: 'Secure user authentication practices.\n\nBest Practices:\n- Password Hashing: bcrypt, argon2\n- Salt: Random data added to password\n- MFA: Multi-factor authentication\n- Session Management\n- Account Lockout\n\nExample:\nconst bcrypt = require(\'bcrypt\');\nconst hash = await bcrypt.hash(password, 10);\nconst valid = await bcrypt.compare(password, hash);\n\nNever store plain text passwords!', xp: 25 },
  { id: 7, title: 'Encryption Basics', content: 'Encryption protects data confidentiality.\n\nTypes:\n- Symmetric: Same key (AES)\n- Asymmetric: Public/Private keys (RSA)\n- Hashing: One-way (SHA-256)\n\nAES Example:\nconst crypto = require(\'crypto\');\nconst cipher = crypto.createCipher(\'aes-256-cbc\', key);\nlet encrypted = cipher.update(text, \'utf8\', \'hex\');\nencrypted += cipher.final(\'hex\');\n\nUse cases: Data at rest, data in transit', xp: 30 },
  { id: 8, title: 'Secure Headers', content: 'HTTP security headers protect against attacks.\n\nKey Headers:\n- Content-Security-Policy: Prevent XSS\n- X-Frame-Options: Prevent clickjacking\n- Strict-Transport-Security: Force HTTPS\n- X-Content-Type-Options: Prevent MIME sniffing\n\nImplementation:\nconst helmet = require(\'helmet\');\napp.use(helmet());\napp.use(helmet.contentSecurityPolicy({\n  directives: { defaultSrc: ["\'\'self\'\'"] }\n}));', xp: 30 },
  { id: 9, title: 'API Security', content: 'Secure your APIs against threats.\n\nBest Practices:\n- Rate Limiting: Prevent abuse\n- API Keys: Authenticate clients\n- OAuth 2.0: Delegated authorization\n- Input Validation: Sanitize data\n- HTTPS Only: Encrypt traffic\n\nExample:\nconst rateLimit = require(\'express-rate-limit\');\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 100\n});\napp.use(\'/api/\', limiter);', xp: 35 },
  { id: 10, title: 'Security Testing', content: 'Test your applications for vulnerabilities.\n\nMethods:\n- SAST: Static analysis\n- DAST: Dynamic analysis\n- Penetration Testing: Ethical hacking\n- Dependency Scanning: Check libraries\n- Security Audits\n\nTools:\n- OWASP ZAP: Web scanner\n- Burp Suite: Proxy tool\n- npm audit: Check dependencies\n- Snyk: Vulnerability scanning\n\nRun: npm audit fix', xp: 35 }
];

const securityQuiz = [
  { q: 'What does CIA stand for in security?', opts: ['Central Intelligence Agency', 'Confidentiality Integrity Availability', 'Cyber Information Analysis', 'Critical Infrastructure Assessment'], ans: 1 },
  { q: 'What is the principle of least privilege?', opts: ['Maximum access', 'Minimum necessary access', 'No access', 'Admin access'], ans: 1 },
  { q: 'What does OWASP stand for?', opts: ['Open Web Application Security Project', 'Online Web App Security Protocol', 'Open Wireless Application Security', 'Organized Web App Security'], ans: 0 },
  { q: 'Which is #1 in OWASP Top 10 2021?', opts: ['Injection', 'Broken Access Control', 'XSS', 'CSRF'], ans: 1 },
  { q: 'What is SQL Injection?', opts: ['Database optimization', 'Malicious SQL code execution', 'SQL syntax error', 'Database backup'], ans: 1 },
  { q: 'How to prevent SQL Injection?', opts: ['Use string concatenation', 'Use prepared statements', 'Disable database', 'Use plain text'], ans: 1 },
  { q: 'What does XSS stand for?', opts: ['Cross-Site Scripting', 'Extra Security System', 'XML Security Standard', 'Cross-Server Sync'], ans: 0 },
  { q: 'Which is a type of XSS?', opts: ['Stored', 'Cached', 'Compiled', 'Encrypted'], ans: 0 },
  { q: 'How to prevent XSS?', opts: ['Disable JavaScript', 'Escape user input', 'Use HTTP', 'Remove HTML'], ans: 1 },
  { q: 'What does CSRF stand for?', opts: ['Cross-Site Request Forgery', 'Cyber Security Risk Factor', 'Cross-Server Request Failure', 'Client-Side Request Form'], ans: 0 },
  { q: 'How to prevent CSRF?', opts: ['Disable cookies', 'Use CSRF tokens', 'Remove forms', 'Use GET only'], ans: 1 },
  { q: 'What is a CSRF token?', opts: ['Password', 'Unique per-session value', 'API key', 'Username'], ans: 1 },
  { q: 'Which algorithm is for password hashing?', opts: ['MD5', 'SHA-1', 'bcrypt', 'Base64'], ans: 2 },
  { q: 'What is a salt in password hashing?', opts: ['Encryption key', 'Random data added to password', 'Hash algorithm', 'Database field'], ans: 1 },
  { q: 'What does MFA stand for?', opts: ['Multi-Factor Authentication', 'Multiple File Access', 'Main Function App', 'Managed File Authentication'], ans: 0 },
  { q: 'Should passwords be stored in plain text?', opts: ['Yes', 'No', 'Sometimes', 'Only for admins'], ans: 1 },
  { q: 'What is symmetric encryption?', opts: ['No key', 'Same key for encrypt/decrypt', 'Two different keys', 'Public key only'], ans: 1 },
  { q: 'Which is a symmetric algorithm?', opts: ['RSA', 'AES', 'ECC', 'DSA'], ans: 1 },
  { q: 'What is asymmetric encryption?', opts: ['No encryption', 'Same key', 'Public and private keys', 'One-way hash'], ans: 2 },
  { q: 'Which is an asymmetric algorithm?', opts: ['AES', 'DES', 'RSA', '3DES'], ans: 2 },
  { q: 'What is hashing?', opts: ['Encryption', 'One-way function', 'Decryption', 'Compression'], ans: 1 },
  { q: 'Which header prevents clickjacking?', opts: ['Content-Type', 'X-Frame-Options', 'Authorization', 'Accept'], ans: 1 },
  { q: 'What does CSP stand for?', opts: ['Content Security Policy', 'Cyber Security Protocol', 'Client Server Protection', 'Cross-Site Protection'], ans: 0 },
  { q: 'Which header forces HTTPS?', opts: ['Content-Type', 'Strict-Transport-Security', 'X-Frame-Options', 'Cache-Control'], ans: 1 },
  { q: 'What is rate limiting?', opts: ['Speed optimization', 'Prevent API abuse', 'Database limit', 'File size limit'], ans: 1 },
  { q: 'What is OAuth 2.0 used for?', opts: ['Encryption', 'Authorization', 'Hashing', 'Compression'], ans: 1 },
  { q: 'What does HTTPS encrypt?', opts: ['Only passwords', 'All traffic', 'Only forms', 'Nothing'], ans: 1 },
  { q: 'What is SAST?', opts: ['Static Application Security Testing', 'Server Application Security Tool', 'Secure App Standard Test', 'System Analysis Security Test'], ans: 0 },
  { q: 'What is penetration testing?', opts: ['Database testing', 'Ethical hacking', 'Unit testing', 'Load testing'], ans: 1 },
  { q: 'Which tool scans for vulnerabilities?', opts: ['npm audit', 'npm install', 'npm start', 'npm build'], ans: 0 }
];

const backendLessons = [
  { id: 1, title: 'Node.js Fundamentals', content: 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine.\n\nKey Concepts:\n- Event Loop: Non-blocking I/O\n- Modules: require(), module.exports\n- NPM: Package manager\n- File System: fs module\n- Process: process.env\n\nExample:\nconst fs = require(\'fs\');\nfs.readFile(\'file.txt\', \'utf8\', (err, data) => {\n  console.log(data);\n});', xp: 10 },
  { id: 2, title: 'Express.js Basics', content: 'Express is a minimal Node.js web framework.\n\nKey Concepts:\n- Routing: app.get(), app.post()\n- Middleware: app.use()\n- Request/Response: req, res\n- Static Files: express.static()\n- Error Handling\n\nExample:\nconst express = require(\'express\');\nconst app = express();\napp.get(\'/\', (req, res) => {\n  res.send(\'Hello World\');\n});\napp.listen(3000);', xp: 15 },
  { id: 3, title: 'REST API Design', content: 'REST (Representational State Transfer) is an architectural style.\n\nKey Principles:\n- Resources: /users, /posts\n- HTTP Methods: GET, POST, PUT, DELETE\n- Status Codes: 200, 201, 400, 404, 500\n- Stateless: No session on server\n- JSON Format\n\nExample:\napp.get(\'/api/users\', (req, res) => {\n  res.json({ users: [] });\n});\napp.post(\'/api/users\', (req, res) => {\n  res.status(201).json({ id: 1 });\n});', xp: 20 },
  { id: 4, title: 'Middleware Patterns', content: 'Middleware functions have access to req, res, and next.\n\nTypes:\n- Application-level: app.use()\n- Router-level: router.use()\n- Error-handling: (err, req, res, next)\n- Built-in: express.json()\n- Third-party: cors, helmet\n\nExample:\nconst logger = (req, res, next) => {\n  console.log(`${req.method} ${req.url}`);\n  next();\n};\napp.use(logger);', xp: 20 },
  { id: 5, title: 'Authentication with JWT', content: 'JWT (JSON Web Tokens) for stateless authentication.\n\nKey Concepts:\n- Token Structure: header.payload.signature\n- Sign: jwt.sign(payload, secret)\n- Verify: jwt.verify(token, secret)\n- Bearer Token: Authorization header\n- Refresh Tokens\n\nExample:\nconst jwt = require(\'jsonwebtoken\');\nconst token = jwt.sign({ userId: 1 }, \'secret\', { expiresIn: \'1h\' });\nconst decoded = jwt.verify(token, \'secret\');', xp: 25 },
  { id: 6, title: 'Database Design (SQL)', content: 'Relational databases store data in tables.\n\nKey Concepts:\n- Tables: rows and columns\n- Primary Key: unique identifier\n- Foreign Key: references another table\n- Relationships: one-to-many, many-to-many\n- Normalization: reduce redundancy\n\nExample:\nCREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  email VARCHAR(255) UNIQUE,\n  created_at TIMESTAMP DEFAULT NOW()\n);', xp: 25 },
  { id: 7, title: 'MongoDB & NoSQL', content: 'MongoDB is a document-oriented NoSQL database.\n\nKey Concepts:\n- Collections: like tables\n- Documents: JSON-like objects\n- Schema-less: flexible structure\n- Queries: find(), findOne()\n- Aggregation Pipeline\n\nExample:\nconst { MongoClient } = require(\'mongodb\');\nconst db = client.db(\'mydb\');\nconst users = db.collection(\'users\');\nawait users.insertOne({ name: \'John\' });', xp: 25 },
  { id: 8, title: 'API Security', content: 'Secure your APIs against common attacks.\n\nKey Practices:\n- Input Validation: sanitize user input\n- Rate Limiting: prevent abuse\n- CORS: control cross-origin requests\n- Helmet: security headers\n- HTTPS: encrypt traffic\n\nExample:\nconst helmet = require(\'helmet\');\nconst rateLimit = require(\'express-rate-limit\');\napp.use(helmet());\napp.use(rateLimit({ windowMs: 15*60*1000, max: 100 }));', xp: 30 },
  { id: 9, title: 'Caching Strategies', content: 'Caching improves performance by storing frequently accessed data.\n\nTypes:\n- In-Memory: Redis, Memcached\n- HTTP Caching: Cache-Control headers\n- CDN: edge caching\n- Database Query Cache\n- Application-level Cache\n\nExample:\nconst redis = require(\'redis\');\nconst client = redis.createClient();\nawait client.set(\'key\', \'value\', { EX: 3600 });\nconst value = await client.get(\'key\');', xp: 30 },
  { id: 10, title: 'Scaling & Deployment', content: 'Scale your application to handle more traffic.\n\nStrategies:\n- Horizontal Scaling: add more servers\n- Load Balancing: distribute traffic\n- Clustering: multiple Node processes\n- Microservices: split into services\n- Docker: containerization\n\nExample:\nconst cluster = require(\'cluster\');\nif (cluster.isMaster) {\n  for (let i = 0; i < 4; i++) cluster.fork();\n} else {\n  app.listen(3000);\n}', xp: 35 }
];

const backendQuiz = [
  { q: 'What is Node.js built on?', opts: ['SpiderMonkey', 'V8 Engine', 'Chakra', 'JavaScriptCore'], ans: 1 },
  { q: 'Which method reads a file asynchronously?', opts: ['fs.readFileSync()', 'fs.readFile()', 'fs.read()', 'fs.open()'], ans: 1 },
  { q: 'What does NPM stand for?', opts: ['Node Package Manager', 'New Package Manager', 'Node Program Manager', 'Network Package Manager'], ans: 0 },
  { q: 'Which Express method handles POST requests?', opts: ['app.get()', 'app.post()', 'app.put()', 'app.send()'], ans: 1 },
  { q: 'What is middleware in Express?', opts: ['Database', 'Function with req, res, next', 'Template engine', 'Router'], ans: 1 },
  { q: 'Which HTTP status code means "Created"?', opts: ['200', '201', '204', '301'], ans: 1 },
  { q: 'What does REST stand for?', opts: ['Remote State Transfer', 'Representational State Transfer', 'Resource State Transfer', 'Request State Transfer'], ans: 1 },
  { q: 'Which HTTP method is idempotent?', opts: ['POST', 'GET', 'PATCH', 'All of them'], ans: 1 },
  { q: 'What does CORS stand for?', opts: ['Cross-Origin Resource Sharing', 'Cross-Origin Request Security', 'Common Origin Resource Sharing', 'Cross-Origin Response System'], ans: 0 },
  { q: 'Which status code indicates server error?', opts: ['400', '404', '500', '401'], ans: 2 },
  { q: 'What does JWT stand for?', opts: ['Java Web Token', 'JSON Web Token', 'JavaScript Web Token', 'Joint Web Token'], ans: 1 },
  { q: 'Where is JWT typically sent?', opts: ['Cookie', 'Authorization header', 'Query string', 'Request body'], ans: 1 },
  { q: 'What are the three parts of a JWT?', opts: ['header.body.signature', 'header.payload.signature', 'token.data.hash', 'auth.data.sign'], ans: 1 },
  { q: 'Which is a SQL database?', opts: ['MongoDB', 'Redis', 'PostgreSQL', 'Cassandra'], ans: 2 },
  { q: 'What is a primary key?', opts: ['First column', 'Unique identifier', 'Foreign reference', 'Index'], ans: 1 },
  { q: 'Which keyword creates a table in SQL?', opts: ['MAKE TABLE', 'CREATE TABLE', 'NEW TABLE', 'ADD TABLE'], ans: 1 },
  { q: 'What does ACID stand for in databases?', opts: ['Atomicity Consistency Isolation Durability', 'Automatic Consistent Isolated Durable', 'Atomic Complete Isolated Data', 'All Consistent Isolated Durable'], ans: 0 },
  { q: 'Which is a NoSQL database?', opts: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'], ans: 2 },
  { q: 'What format does MongoDB use?', opts: ['XML', 'JSON-like (BSON)', 'CSV', 'Plain text'], ans: 1 },
  { q: 'Which MongoDB method finds one document?', opts: ['find()', 'findOne()', 'getOne()', 'select()'], ans: 1 },
  { q: 'What is SQL injection?', opts: ['Database optimization', 'Security vulnerability', 'Query method', 'Data type'], ans: 1 },
  { q: 'Which header prevents XSS attacks?', opts: ['Content-Type', 'Content-Security-Policy', 'Authorization', 'Accept'], ans: 1 },
  { q: 'What does rate limiting prevent?', opts: ['Caching', 'API abuse', 'Authentication', 'Routing'], ans: 1 },
  { q: 'Which protocol encrypts HTTP traffic?', opts: ['FTP', 'HTTPS', 'SSH', 'SMTP'], ans: 1 },
  { q: 'What is Redis commonly used for?', opts: ['File storage', 'Caching', 'Authentication', 'Routing'], ans: 1 },
  { q: 'Which header controls caching?', opts: ['Content-Type', 'Cache-Control', 'Authorization', 'Accept'], ans: 1 },
  { q: 'What does CDN stand for?', opts: ['Content Delivery Network', 'Central Data Network', 'Cache Distribution Network', 'Content Data Node'], ans: 0 },
  { q: 'What is horizontal scaling?', opts: ['Increase server size', 'Add more servers', 'Optimize code', 'Use caching'], ans: 1 },
  { q: 'What does Docker provide?', opts: ['Database', 'Containerization', 'Load balancing', 'Caching'], ans: 1 },
  { q: 'Which distributes traffic across servers?', opts: ['Router', 'Load balancer', 'Cache', 'Database'], ans: 1 }
];

const frontendLessons = [
  { id: 1, title: 'HTML Fundamentals', content: 'HTML (HyperText Markup Language) is the standard markup language for web pages.\n\nKey Concepts:\n- Elements and Tags: <tag>content</tag>\n- Attributes: <a href="url">link</a>\n- Semantic HTML: <header>, <nav>, <main>, <footer>\n- Forms: <form>, <input>, <button>\n- Tables: <table>, <tr>, <td>\n\nExample:\n<article>\n  <h1>Title</h1>\n  <p>Paragraph text</p>\n</article>', xp: 10 },
  { id: 2, title: 'CSS Fundamentals', content: 'CSS (Cascading Style Sheets) styles HTML elements.\n\nKey Concepts:\n- Selectors: element, .class, #id\n- Box Model: margin, border, padding, content\n- Display: block, inline, flex, grid\n- Position: static, relative, absolute, fixed\n- Colors: hex, rgb, hsl\n\nExample:\n.container {\n  display: flex;\n  padding: 20px;\n  background: #f0f0f0;\n}', xp: 10 },
  { id: 3, title: 'Flexbox Layout', content: 'Flexbox is a one-dimensional layout system.\n\nKey Properties:\n- display: flex\n- flex-direction: row | column\n- justify-content: center | space-between\n- align-items: center | stretch\n- flex-wrap: wrap | nowrap\n\nExample:\n.flex-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}', xp: 15 },
  { id: 4, title: 'CSS Grid Layout', content: 'CSS Grid is a two-dimensional layout system.\n\nKey Properties:\n- display: grid\n- grid-template-columns: repeat(3, 1fr)\n- grid-gap: 20px\n- grid-template-areas\n\nExample:\n.grid {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n  gap: 20px;\n}', xp: 15 },
  { id: 5, title: 'JavaScript Basics', content: 'JavaScript adds interactivity to web pages.\n\nKey Concepts:\n- Variables: let, const, var\n- Data Types: string, number, boolean, object, array\n- Functions: function name() {}\n- Conditionals: if, else, switch\n- Loops: for, while, forEach\n\nExample:\nconst greet = (name) => {\n  return `Hello, ${name}!`;\n};\nconsole.log(greet("World"));', xp: 20 },
  { id: 6, title: 'DOM Manipulation', content: 'The DOM (Document Object Model) represents HTML as objects.\n\nKey Methods:\n- document.querySelector()\n- element.addEventListener()\n- element.innerHTML\n- element.classList.add()\n- document.createElement()\n\nExample:\nconst btn = document.querySelector(".btn");\nbtn.addEventListener("click", () => {\n  alert("Clicked!");\n});', xp: 20 },
  { id: 7, title: 'ES6+ Features', content: 'Modern JavaScript features.\n\nKey Features:\n- Arrow Functions: () => {}\n- Destructuring: const {name} = obj\n- Spread Operator: [...array]\n- Template Literals: `Hello ${name}`\n- Promises & Async/Await\n\nExample:\nconst fetchData = async () => {\n  const res = await fetch(url);\n  const data = await res.json();\n  return data;\n};', xp: 25 },
  { id: 8, title: 'React Fundamentals', content: 'React is a JavaScript library for building UIs.\n\nKey Concepts:\n- Components: function Component() {}\n- JSX: HTML-like syntax in JS\n- Props: passing data to components\n- State: useState hook\n- Effects: useEffect hook\n\nExample:\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}', xp: 30 },
  { id: 9, title: 'React Hooks', content: 'Hooks let you use state and effects in function components.\n\nCommon Hooks:\n- useState: manage state\n- useEffect: side effects\n- useContext: consume context\n- useRef: DOM references\n- useMemo: memoize values\n\nExample:\nconst [data, setData] = useState([]);\nuseEffect(() => {\n  fetchData().then(setData);\n}, []);', xp: 30 },
  { id: 10, title: 'Performance Optimization', content: 'Optimize React apps for better performance.\n\nTechniques:\n- Code Splitting: React.lazy()\n- Memoization: React.memo, useMemo\n- Virtual Scrolling\n- Debouncing/Throttling\n- Image Optimization\n\nExample:\nconst MemoComponent = React.memo(({ data }) => {\n  return <div>{data}</div>;\n});', xp: 35 }
];

const frontendQuiz = [
  { q: 'What does HTML stand for?', opts: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks Text Mark Language'], ans: 0 },
  { q: 'Which HTML tag is used for the largest heading?', opts: ['<h6>', '<heading>', '<h1>', '<head>'], ans: 2 },
  { q: 'What is the correct CSS syntax?', opts: ['body:color=black;', '{body;color:black;}', 'body {color: black;}', '{body:color=black;}'], ans: 2 },
  { q: 'Which property is used to change background color?', opts: ['bgcolor', 'color', 'background-color', 'bg-color'], ans: 2 },
  { q: 'What does CSS stand for?', opts: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'], ans: 1 },
  { q: 'Which CSS property controls text size?', opts: ['font-size', 'text-size', 'font-style', 'text-style'], ans: 0 },
  { q: 'How do you make text bold in CSS?', opts: ['font-weight: bold;', 'text-style: bold;', 'font: bold;', 'text-weight: bold;'], ans: 0 },
  { q: 'Which is NOT a valid CSS display value?', opts: ['block', 'inline', 'flex', 'show'], ans: 3 },
  { q: 'What is Flexbox used for?', opts: ['Database', 'Layout', 'Animation', 'Security'], ans: 1 },
  { q: 'Which property aligns items vertically in Flexbox?', opts: ['justify-content', 'align-items', 'vertical-align', 'flex-align'], ans: 1 },
  { q: 'What does "1fr" mean in CSS Grid?', opts: ['1 frame', '1 fraction', '1 fragment', '1 function'], ans: 1 },
  { q: 'Which JavaScript keyword declares a constant?', opts: ['var', 'let', 'const', 'constant'], ans: 2 },
  { q: 'What is the output of: typeof []?', opts: ['array', 'object', 'list', 'undefined'], ans: 1 },
  { q: 'Which method adds an element to the end of an array?', opts: ['push()', 'pop()', 'shift()', 'unshift()'], ans: 0 },
  { q: 'What does DOM stand for?', opts: ['Document Object Model', 'Data Object Model', 'Digital Object Model', 'Document Oriented Model'], ans: 0 },
  { q: 'Which method selects an element by ID?', opts: ['querySelector()', 'getElementById()', 'getElement()', 'selectById()'], ans: 1 },
  { q: 'What is an arrow function syntax?', opts: ['function() {}', '() => {}', 'func() {}', '-> {}'], ans: 1 },
  { q: 'What does the spread operator look like?', opts: ['...', '***', '+++', '---'], ans: 0 },
  { q: 'Which hook manages state in React?', opts: ['useEffect', 'useState', 'useContext', 'useRef'], ans: 1 },
  { q: 'What is JSX?', opts: ['JavaScript XML', 'Java Syntax Extension', 'JSON Extension', 'JavaScript Extra'], ans: 0 },
  { q: 'How do you pass data to a React component?', opts: ['state', 'props', 'params', 'data'], ans: 1 },
  { q: 'Which hook handles side effects?', opts: ['useState', 'useEffect', 'useMemo', 'useCallback'], ans: 1 },
  { q: 'What does React.memo do?', opts: ['Stores data', 'Memoizes component', 'Creates memory', 'Manages state'], ans: 1 },
  { q: 'Which is used for code splitting?', opts: ['React.split()', 'React.lazy()', 'React.load()', 'React.async()'], ans: 1 },
  { q: 'What is the virtual DOM?', opts: ['Real DOM copy', 'In-memory representation', 'Browser DOM', 'Server DOM'], ans: 1 },
  { q: 'Which CSS unit is relative to viewport width?', opts: ['px', 'em', 'vw', 'pt'], ans: 2 },
  { q: 'What is the box model order from outside to inside?', opts: ['margin-border-padding-content', 'padding-margin-border-content', 'border-margin-padding-content', 'content-padding-border-margin'], ans: 0 },
  { q: 'Which position value removes element from flow?', opts: ['static', 'relative', 'absolute', 'sticky'], ans: 2 },
  { q: 'What does z-index control?', opts: ['Size', 'Position', 'Stacking order', 'Zoom'], ans: 2 },
  { q: 'Which is NOT a JavaScript data type?', opts: ['string', 'number', 'boolean', 'character'], ans: 3 }
];

export default function TrackerPage() {
  const [track, setTrack] = useState('frontend');
  const [view, setView] = useState('dashboard');
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem(`completed_lessons_${track}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizPassed, setQuizPassed] = useState(() => {
    const saved = localStorage.getItem(`quiz_passed_${track}`);
    return saved === 'true';
  });
  const [submittedProjects, setSubmittedProjects] = useState(() => {
    const saved = localStorage.getItem(`submitted_projects_${track}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [projectSubmission, setProjectSubmission] = useState({ link: '', notes: '' });
  const [userXP, setUserXP] = useState(() => {
    const saved = localStorage.getItem('tracker_xp');
    return saved ? parseInt(saved) : 0;
  });

  const lessons = track === 'frontend' ? frontendLessons : track === 'backend' ? backendLessons : track === 'security' ? securityLessons : track === 'ai' ? aiLessons : mlLessons;
  const quiz = track === 'frontend' ? frontendQuiz : track === 'backend' ? backendQuiz : track === 'security' ? securityQuiz : track === 'ai' ? aiQuiz : mlQuiz;
  const projects = projectTasks[track] || [];

  useEffect(() => {
    const saved = localStorage.getItem(`completed_lessons_${track}`);
    setCompletedLessons(saved ? JSON.parse(saved) : []);
    const passedSaved = localStorage.getItem(`quiz_passed_${track}`);
    setQuizPassed(passedSaved === 'true');
    const projectsSaved = localStorage.getItem(`submitted_projects_${track}`);
    setSubmittedProjects(projectsSaved ? JSON.parse(projectsSaved) : []);
    setSelectedLesson(null);
    setSelectedProject(null);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setProjectSubmission({ link: '', notes: '' });
  }, [track]);

  useEffect(() => {
    localStorage.setItem(`completed_lessons_${track}`, JSON.stringify(completedLessons));
  }, [completedLessons, track]);

  useEffect(() => {
    localStorage.setItem('tracker_xp', userXP.toString());
  }, [userXP]);

  useEffect(() => {
    localStorage.setItem(`submitted_projects_${track}`, JSON.stringify(submittedProjects));
  }, [submittedProjects, track]);

  useEffect(() => {
    localStorage.setItem(`quiz_passed_${track}`, quizPassed.toString());
  }, [quizPassed, track]);

  const completeLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      const lesson = lessons.find(l => l.id === lessonId);
      setCompletedLessons([...completedLessons, lessonId]);
      setUserXP(prev => prev + lesson.xp);
    }
    setSelectedLesson(null);
    setView('lessons');
  };

  const submitQuiz = () => {
    let correct = 0;
    quiz.forEach((q, i) => {
      if (quizAnswers[i] === q.ans) correct++;
    });
    const score = Math.round((correct / quiz.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);
    if (score >= 70) {
      setUserXP(prev => prev + 100);
      setQuizPassed(true);
    }
  };

  const submitProject = () => {
    if (!projectSubmission.link.trim()) return;
    const submission = {
      projectId: selectedProject.id,
      title: selectedProject.title,
      link: projectSubmission.link,
      notes: projectSubmission.notes,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };
    setSubmittedProjects([...submittedProjects, submission]);
    setProjectSubmission({ link: '', notes: '' });
    setSelectedProject(null);
    setView('projects');
  };

  const progress = Math.round((completedLessons.length / lessons.length) * 100);
  const allProjectsSubmitted = projects.every(p => submittedProjects.some(s => s.projectId === p.id));

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-20" />
      <section className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-brand text-brand-400 text-xs font-medium mb-4">
              <TrendingUp className="w-3 h-3" />LEARNING TRACKER
            </span>
            <h1 className="text-3xl font-bold mb-2">Track Your <span className="gradient-text">Growth</span></h1>
            <p className="text-dark-400 text-sm">{track === 'frontend' ? 'Frontend' : track === 'backend' ? 'Backend' : track === 'security' ? 'Cyber Security' : track === 'ai' ? 'AI & Machine Learning' : 'Advanced Machine Learning'} Development Track</p>
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <button onClick={() => setTrack('frontend')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${track === 'frontend' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400 hover:text-dark-200'}`}>
              <Code2 className="w-4 h-4" />Frontend
            </button>
            <button onClick={() => setTrack('backend')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${track === 'backend' ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20' : 'text-dark-400 hover:text-dark-200'}`}>
              <Server className="w-4 h-4" />Backend
            </button>
            <button onClick={() => setTrack('security')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${track === 'security' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'text-dark-400 hover:text-dark-200'}`}>
              <Shield className="w-4 h-4" />Security
            </button>
            <button onClick={() => setTrack('ai')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${track === 'ai' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'text-dark-400 hover:text-dark-200'}`}>
              <Brain className="w-4 h-4" />AI/ML
            </button>
            <button onClick={() => setTrack('ml')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${track === 'ml' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-dark-400 hover:text-dark-200'}`}>
              <Cpu className="w-4 h-4" />Advanced ML
            </button>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <button onClick={() => setView('dashboard')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'dashboard' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400 hover:text-dark-200'}`}>Dashboard</button>
            <button onClick={() => setView('lessons')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'lessons' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400 hover:text-dark-200'}`}>Lessons</button>
            <button onClick={() => setView('quiz')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'quiz' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400 hover:text-dark-200'}`}>Final Quiz</button>
            <button onClick={() => setView('projects')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'projects' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400 hover:text-dark-200'}`}>Projects</button>
            <button onClick={() => setView('certification')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'certification' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400 hover:text-dark-200'}`}>Certification</button>
          </div>

          {view === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-brand-400">{completedLessons.length}</div>
                  <div className="text-xs text-dark-500">Lessons Done</div>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-accent-400">{lessons.length - completedLessons.length}</div>
                  <div className="text-xs text-dark-500">Remaining</div>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-400">{userXP}</div>
                  <div className="text-xs text-dark-500">Total XP</div>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">{progress}%</div>
                  <div className="text-xs text-dark-500">Progress</div>
                </div>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold text-dark-100 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-brand-400" />{track === 'frontend' ? 'Frontend' : track === 'backend' ? 'Backend' : track === 'security' ? 'Cyber Security' : track === 'ai' ? 'AI & Machine Learning' : 'Advanced Machine Learning'} Development Progress
                </h3>
                <div className="w-full h-3 bg-dark-800 rounded-full overflow-hidden mb-2">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-brand-500 to-brand-400" />
                </div>
                <p className="text-xs text-dark-500">{completedLessons.length} of {lessons.length} lessons completed</p>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold text-dark-100 mb-4">Continue Learning</h3>
                {lessons.filter(l => !completedLessons.includes(l.id)).slice(0, 3).map(lesson => (
                  <button key={lesson.id} onClick={() => { setSelectedLesson(lesson); setView('lessons'); }} className="w-full text-left p-4 rounded-lg hover:bg-dark-800/30 transition-all flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Play className="w-4 h-4 text-brand-400" />
                      <span className="text-sm text-dark-200">{lesson.title}</span>
                    </div>
                    <span className="text-xs text-dark-500">{lesson.xp} XP</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {view === 'lessons' && !selectedLesson && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lessons.map((lesson, i) => {
                const isCompleted = completedLessons.includes(lesson.id);
                const isLocked = i > 0 && !completedLessons.includes(lessons[i - 1].id);
                return (
                  <motion.div key={lesson.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <button onClick={() => !isLocked && setSelectedLesson(lesson)} disabled={isLocked} className="w-full text-left glass rounded-xl p-5 hover:border-brand-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-dark-500">Lesson {lesson.id}</span>
                        {isCompleted ? <CheckCircle className="w-4 h-4 text-green-400" /> : isLocked ? <Lock className="w-4 h-4 text-dark-600" /> : null}
                      </div>
                      <h3 className="text-sm font-semibold text-dark-100 mb-2">{lesson.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-brand-400">{lesson.xp} XP</span>
                        {!isLocked && <ChevronRight className="w-4 h-4 text-dark-500" />}
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}

          {view === 'lessons' && selectedLesson && (
            <div className="glass rounded-xl p-6">
              <button onClick={() => setSelectedLesson(null)} className="text-sm text-dark-500 hover:text-dark-300 mb-4">← Back to lessons</button>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-dark-100">{selectedLesson.title}</h2>
                <span className="text-sm text-brand-400">{selectedLesson.xp} XP</span>
              </div>
              <div className="prose prose-invert max-w-none">
                <pre className="text-sm text-dark-300 whitespace-pre-wrap leading-relaxed bg-dark-800/50 p-4 rounded-lg">{selectedLesson.content}</pre>
              </div>
              <div className="mt-6">
                <Button onClick={() => completeLesson(selectedLesson.id)} disabled={completedLessons.includes(selectedLesson.id)}>
                  {completedLessons.includes(selectedLesson.id) ? <><CheckCircle className="w-4 h-4" />Completed</> : <>Complete Lesson</>}
                </Button>
              </div>
            </div>
          )}

          {view === 'projects' && !selectedProject && (
            <div>
              {!quizPassed ? (
                <div className="glass rounded-xl p-8 text-center">
                  <Lock className="w-12 h-12 text-dark-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-dark-200 mb-2">Projects Locked</h3>
                  <p className="text-sm text-dark-400">Pass the final quiz with 70%+ to unlock project submissions</p>
                </div>
              ) : (
                <div>
                  <div className="glass rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-dark-100 mb-2">🏆 Final Assessment Projects</h3>
                    <p className="text-sm text-dark-400">Complete and submit projects to earn certification. Each project: 200 XP</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {projects.map((project, i) => {
                      const isSubmitted = submittedProjects.some(s => s.projectId === project.id);
                      return (
                        <motion.div key={project.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                          <div className="glass rounded-xl p-5">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-dark-100 mb-2">{project.title}</h3>
                                <p className="text-sm text-dark-400 whitespace-pre-line">{project.description}</p>
                              </div>
                              {isSubmitted && <CheckCircle className="w-5 h-5 text-green-400 ml-4" />}
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <span className="text-xs text-brand-400">{project.xp} XP</span>
                              {!isSubmitted && (
                                <Button onClick={() => setSelectedProject(project)} size="sm"><Upload className="w-4 h-4" />Submit Project</Button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {view === 'projects' && selectedProject && (
            <div className="glass rounded-xl p-6">
              <button onClick={() => { setSelectedProject(null); setProjectSubmission({ link: '', notes: '' }); }} className="text-sm text-dark-500 hover:text-dark-300 mb-4">← Back to projects</button>
              <h2 className="text-xl font-bold text-dark-100 mb-4">{selectedProject.title}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Project Link (GitHub/Demo URL) *</label>
                  <input type="url" value={projectSubmission.link} onChange={(e) => setProjectSubmission({ ...projectSubmission, link: e.target.value })} placeholder="https://github.com/username/project" className="w-full px-4 py-2.5 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Additional Notes (Optional)</label>
                  <textarea value={projectSubmission.notes} onChange={(e) => setProjectSubmission({ ...projectSubmission, notes: e.target.value })} placeholder="Any additional information about your project..." className="w-full h-24 px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 resize-none" />
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <p className="text-sm text-blue-400">📧 Your submission will be sent to the instructor for review. You'll be notified once graded.</p>
                </div>
                <Button onClick={submitProject} disabled={!projectSubmission.link.trim()} size="lg"><Send className="w-4 h-4" />Submit for Review</Button>
              </div>
            </div>
          )}

          {view === 'certification' && (
            <div className="glass rounded-xl p-8 text-center">
              {!quizPassed ? (
                <div>
                  <Lock className="w-16 h-16 text-dark-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-dark-200 mb-2">Certification Locked</h3>
                  <p className="text-dark-400 mb-6">Complete all lessons and pass the final quiz to unlock certification</p>
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <span className={completedLessons.length === lessons.length ? 'text-green-400' : 'text-dark-500'}>✓ Complete all lessons ({completedLessons.length}/{lessons.length})</span>
                    <span className={quizPassed ? 'text-green-400' : 'text-dark-500'}>✓ Pass final quiz (70%+)</span>
                  </div>
                </div>
              ) : !allProjectsSubmitted ? (
                <div>
                  <FileText className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-dark-100 mb-2">Almost There!</h3>
                  <p className="text-dark-400 mb-6">Submit all {projects.length} projects to earn your certification</p>
                  <div className="max-w-md mx-auto mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-dark-400">Projects Submitted</span>
                      <span className="text-sm text-brand-400">{submittedProjects.length}/{projects.length}</span>
                    </div>
                    <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-brand-500 to-brand-400" style={{ width: `${(submittedProjects.length / projects.length) * 100}%` }} />
                    </div>
                  </div>
                  <Button onClick={() => setView('projects')} size="lg">Go to Projects</Button>
                </div>
              ) : (
                <div>
                  <Award className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-dark-100 mb-2">🎉 Certification Pending!</h3>
                  <p className="text-dark-400 mb-6">All projects submitted! Your work is under review.</p>
                  <div className="max-w-2xl mx-auto glass rounded-xl p-6 mb-6">
                    <h4 className="font-semibold text-dark-100 mb-4">What happens next?</h4>
                    <div className="space-y-3 text-left text-sm text-dark-300">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0 text-xs font-bold">1</div>
                        <p>Your projects will be reviewed by the instructor</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0 text-xs font-bold">2</div>
                        <p>You'll receive feedback and points for each project</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0 text-xs font-bold">3</div>
                        <p>Once approved, you'll receive your official Codevra certification</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0 text-xs font-bold">4</div>
                        <p>Share your achievement on LinkedIn and your portfolio!</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 max-w-md mx-auto">
                    <p className="text-sm text-green-400">📧 Check your email for updates on your certification status</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {view === 'quiz' && (
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-dark-100 mb-1">{track === 'frontend' ? 'Frontend' : track === 'backend' ? 'Backend' : track === 'security' ? 'Cyber Security' : track === 'ai' ? 'AI & Machine Learning' : 'Advanced Machine Learning'} Development Quiz</h2>
                  <p className="text-sm text-dark-400">30 questions • 70% to pass • 100 XP reward</p>
                </div>
                {quizSubmitted && <Award className={`w-8 h-8 ${quizScore >= 70 ? 'text-green-400' : 'text-red-400'}`} />}
              </div>
              {!quizSubmitted ? (
                <div className="space-y-6">
                  {quiz.map((q, i) => (
                    <div key={i} className="p-4 rounded-lg bg-dark-800/30">
                      <p className="text-sm text-dark-200 mb-3 font-medium">{i + 1}. {q.q}</p>
                      <div className="space-y-2">
                        {q.opts.map((opt, j) => (
                          <button key={j} onClick={() => setQuizAnswers({ ...quizAnswers, [i]: j })} className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${quizAnswers[i] === j ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30' : 'bg-dark-800/50 text-dark-300 hover:bg-dark-800'}`}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button onClick={submitQuiz} disabled={Object.keys(quizAnswers).length < quiz.length} size="lg">Submit Quiz</Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className={`text-6xl font-bold mb-4 ${quizScore >= 70 ? 'text-green-400' : 'text-red-400'}`}>{quizScore}%</div>
                  <p className="text-lg text-dark-200 mb-2">{quizScore >= 70 ? '🎉 Congratulations! You passed!' : '❌ Keep learning and try again!'}</p>
                  <p className="text-sm text-dark-400 mb-6">{quizScore >= 70 ? '+100 XP earned!' : 'You need 70% to pass'}</p>
                  <Button onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }} variant="secondary">Retake Quiz</Button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

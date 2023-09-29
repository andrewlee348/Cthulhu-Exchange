# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows
venv\Scripts\activate
# On macOS
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Updating requirements
pip freeze > requirements.txt
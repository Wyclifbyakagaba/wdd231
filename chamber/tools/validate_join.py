import re
import sys
from pathlib import Path

file_path = Path(__file__).resolve().parents[1] / 'join.html'
html = file_path.read_text(encoding='utf-8')

errors = []

# Extract first form
form_open_match = re.search(r'<form\b([^>]*)>', html, re.IGNORECASE)
form_close_match = re.search(r'</form>', html, re.IGNORECASE)
if not form_open_match or not form_close_match:
    errors.append('Document must contain a single <form> element with method="get" and action="thankyou.html".')
    print("ERROR: No <form>...</form> block found.")
    sys.exit(1)

form_open_tag = form_open_match.group(0)
form_attrs = form_open_match.group(1)
form_start = form_open_match.start()
form_end = form_close_match.end()
form_html = html[form_start:form_end]

# Check method and action
if not re.search(r'method\s*=\s*["\']get["\']', form_open_tag, re.IGNORECASE):
    errors.append('Form must have method="get"')
if not re.search(r'action\s*=\s*["\'][^"\']*thankyou\.html["\']', form_open_tag, re.IGNORECASE):
    errors.append('Form must have action="thankyou.html"')

# Required fields and their expected ids/names
fields = {
    'firstName': 'First Name',
    'lastName': 'Last Name',
    'orgTitle': 'Organization Title',
    'email': 'Email',
    'phone': 'Mobile Phone',
    'organizationName': 'Organization Name',
    'membershipLevel': 'Membership Level (select)',
    'organizationDescription': 'Organization Description (textarea)',
    'timestamp': 'Timestamp (hidden)'
}

for fid, desc in fields.items():
    # check presence of id in form_html
    if not re.search(r'id\s*=\s*["\']%s["\']' % re.escape(fid), form_html):
        errors.append(f'No valid element found for {desc} (id="{fid}")')

# Submit button inside form
if not re.search(r'<button\b[^>]*type\s*=\s*["\']submit["\'][^>]*>.*?</button>', form_html, re.IGNORECASE | re.DOTALL):
    errors.append('No submit button of type="submit" found inside the form.')

# Labels: check that each non-hidden field has a label with for="id"
for fid, desc in fields.items():
    if fid == 'timestamp':
        continue
    label_regex = re.compile(r'<label\b[^>]*for\s*=\s*["\']%s["\'][^>]*>' % re.escape(fid), re.IGNORECASE)
    if not label_regex.search(html):
        errors.append(f'No <label for="{fid}"> found for {desc}.')

# Report
if errors:
    print('Validation failed with the following issues:')
    for e in errors:
        print('- ' + e)
    sys.exit(2)
else:
    print('Validation passed: all required form elements and labels found.')
    sys.exit(0)

import os
import re

articles_dir = r"c:\Users\rohit\.gemini\antigravity\playground\tensor-granule\TestURLPages\articles"
template_path = os.path.join(articles_dir, "article-template.html")

# Read the template to get the updated sections
with open(template_path, 'r', encoding='utf-8') as f:
    template_content = f.read()

# 1. Extract the updated textarea/error div part
form_pattern = r'<form id="comment-form" class="comment-form">[\s\S]*?</form>'
template_form = re.search(form_pattern, template_content).group(0)

# 2. Extract the updated script part (excluding CURRENT_ARTICLE_ID)
script_pattern = r'<script>([\s\S]*?)</script>'
template_script = re.search(script_pattern, template_content).group(1)

# We want everything after CURRENT_ARTICLE_ID initialization in the new template
# Actually, it's easier to just replace the whole script but keep the CURRENT_ARTICLE_ID line.
id_line_pattern = r"const CURRENT_ARTICLE_ID = '.*';"
template_id_line = re.search(id_line_pattern, template_script).group(0)

# The new script part after the ID line
script_body_start = template_script.find(template_id_line) + len(template_id_line)
template_script_body = template_script[script_body_start:]

# 3. Process all other HTML files
for filename in os.listdir(articles_dir):
    if filename.endswith(".html") and filename != "article-template.html":
        file_path = os.path.join(articles_dir, filename)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace Form
        new_content = re.sub(form_pattern, template_form, content)
        
        # Replace Script
        # First, find existing CURRENT_ARTICLE_ID in the target file
        existing_id_match = re.search(id_line_pattern, content)
        if existing_id_match:
            existing_id_line = existing_id_match.group(0)
            
            # Construct the new script: everything before script tag, then the tag, 
            # then ID line, then the rest of template script, then closing tag, then rest of content.
            # But regex sub is easier.
            
            # Find the old script content and replace it
            def script_replacer(match):
                # Use the existing ID line but the rest from the template
                return f"<script>\n        // Backend API configuration\n        const API_BASE_URL = 'http://localhost:3000/api/comments';\n        {existing_id_line}{template_script_body}</script>"
            
            new_content = re.sub(script_pattern, script_replacer, new_content)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
        else:
            print(f"Could not find ID line in {filename}")

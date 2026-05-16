import pandas as pd
import os
from datetime import datetime

# ===== EXCEL FOLDER =====
excel_folder = r"C:\RP\Personal\Extracted Zip Backup\Daily Output\Comparison"

# ===== FIND LATEST EXCEL FILE =====
files = sorted(
    [f for f in os.listdir(excel_folder) if f.endswith(".xlsx")],
    key=lambda x: os.path.getmtime(os.path.join(excel_folder, x))
)

latest_file = os.path.join(excel_folder, files[-1])

print("Using file:", latest_file)

# ===== LOAD EXCEL =====
xls = pd.ExcelFile(latest_file)

# ===== START HTML =====
html = f"""
<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">

<title>Daily Comparison Report</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<link rel="stylesheet"
href="https://cdn.datatables.net/1.13.8/css/dataTables.bootstrap5.min.css"/>

<style>

body {{
    padding: 20px;
}}

.table-container {{
    margin-top: 20px;
}}

.updated-time {{
    color: gray;
    margin-bottom: 20px;
}}

</style>

</head>

<body>

<div class="container-fluid">

<h1>Daily Comparison Report</h1>

<div class="updated-time">
Last Updated:
{datetime.now().strftime("%d %b %Y %I:%M %p")}
</div>

<ul class="nav nav-tabs">
"""

# ===== CREATE TABS =====
for i, sheet in enumerate(xls.sheet_names):

    active = "active" if i == 0 else ""

    html += f"""
    <li class="nav-item">
        <button class="nav-link {active}"
        data-bs-toggle="tab"
        data-bs-target="#sheet{i}">
        {sheet}
        </button>
    </li>
    """

html += "</ul><div class='tab-content'>"

# ===== CREATE TABLES =====
for i, sheet in enumerate(xls.sheet_names):

    active = "show active" if i == 0 else ""

    df = pd.read_excel(latest_file, sheet_name=sheet)

    table_html = df.to_html(
        index=False,
        classes="table table-striped table-bordered datatable"
    )

    html += f"""
    <div class="tab-pane fade {active}"
    id="sheet{i}">

    <div class="table-container">
    {table_html}
    </div>

    </div>
    """

# ===== END HTML =====
html += """

</div>

</div>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>

<script src="https://cdn.datatables.net/1.13.8/js/dataTables.bootstrap5.min.js"></script>

<script>

$(document).ready(function () {

    $('.datatable').DataTable({
        pageLength: 25
    });

});

</script>

</body>
</html>
"""

# ===== SAVE HTML =====
output_file = "dailycomparison/index.html"

with open(output_file, "w", encoding="utf-8") as f:
    f.write(html)

print("Website generated successfully!")
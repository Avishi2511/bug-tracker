import xml.etree.ElementTree as ET

def create_admin_wireframe():
    """Create Admin Dashboard Wireframe"""
    svg = ET.Element('svg', {
        'width': '1200',
        'height': '800',
        'xmlns': 'http://www.w3.org/2000/svg'
    })
    
    # Background
    ET.SubElement(svg, 'rect', {
        'width': '1200',
        'height': '800',
        'fill': 'white',
        'stroke': 'none'
    })
    
    # Header
    ET.SubElement(svg, 'rect', {
        'x': '0', 'y': '0',
        'width': '1200', 'height': '60',
        'fill': '#f8f9fa',
        'stroke': 'black',
        'stroke-width': '2'
    })
    
    # Header Title
    title = ET.SubElement(svg, 'text', {
        'x': '20', 'y': '35',
        'font-family': 'Arial',
        'font-size': '16',
        'font-weight': 'bold',
        'fill': 'black'
    })
    title.text = 'Bug Tracker - Admin Dashboard'
    
    # User Info Button
    ET.SubElement(svg, 'rect', {
        'x': '1050', 'y': '15',
        'width': '80', 'height': '30',
        'fill': '#e9ecef',
        'stroke': 'black',
        'stroke-width': '1'
    })
    user_info = ET.SubElement(svg, 'text', {
        'x': '1070', 'y': '33',
        'font-family': 'Arial',
        'font-size': '12',
        'fill': 'black'
    })
    user_info.text = 'User Info'
    
    # Logout Button
    ET.SubElement(svg, 'rect', {
        'x': '1140', 'y': '15',
        'width': '50', 'height': '30',
        'fill': '#dc3545',
        'stroke': 'black',
        'stroke-width': '1'
    })
    logout = ET.SubElement(svg, 'text', {
        'x': '1155', 'y': '33',
        'font-family': 'Arial',
        'font-size': '12',
        'fill': 'white'
    })
    logout.text = 'Logout'
    
    # Sidebar Navigation
    ET.SubElement(svg, 'rect', {
        'x': '0', 'y': '60',
        'width': '250', 'height': '740',
        'fill': '#f1f3f4',
        'stroke': 'black',
        'stroke-width': '2'
    })
    
    nav_title = ET.SubElement(svg, 'text', {
        'x': '20', 'y': '90',
        'font-family': 'Arial',
        'font-size': '16',
        'font-weight': 'bold',
        'fill': 'black'
    })
    nav_title.text = 'Navigation'
    
    # Navigation Menu Items
    nav_items = ['Dashboard', 'Bug Management', 'User Management', 'Project Management']
    for i, item in enumerate(nav_items):
        y_pos = str(110 + i * 50)
        fill_color = '#007bff' if i == 0 else '#ffffff'
        text_color = 'white' if i == 0 else 'black'
        
        ET.SubElement(svg, 'rect', {
            'x': '20', 'y': y_pos,
            'width': '210', 'height': '40',
            'fill': fill_color,
            'stroke': 'black',
            'stroke-width': '1'
        })
        
        nav_text = ET.SubElement(svg, 'text', {
            'x': '30', 'y': str(int(y_pos) + 25),
            'font-family': 'Arial',
            'font-size': '14',
            'fill': text_color
        })
        nav_text.text = item
    
    # Main Content Area
    ET.SubElement(svg, 'rect', {
        'x': '250', 'y': '60',
        'width': '950', 'height': '740',
        'fill': '#ffffff',
        'stroke': 'black',
        'stroke-width': '2'
    })
    
    # Breadcrumb
    ET.SubElement(svg, 'rect', {
        'x': '270', 'y': '80',
        'width': '910', 'height': '30',
        'fill': '#f8f9fa',
        'stroke': 'black',
        'stroke-width': '1'
    })
    breadcrumb = ET.SubElement(svg, 'text', {
        'x': '280', 'y': '98',
        'font-family': 'Arial',
        'font-size': '12',
        'fill': 'black'
    })
    breadcrumb.text = 'Home > Dashboard'
    
    # Statistics Overview Title
    stats_title = ET.SubElement(svg, 'text', {
        'x': '280', 'y': '140',
        'font-family': 'Arial',
        'font-size': '18',
        'font-weight': 'bold',
        'fill': 'black'
    })
    stats_title.text = 'Statistics Overview'
    
    # Statistics Cards
    card_data = [
        {'title': 'Total Bugs Count', 'color': '#e3f2fd'},
        {'title': 'Active Users Count', 'color': '#e8f5e8'},
        {'title': 'Active Projects Count', 'color': '#fff3e0'}
    ]
    
    for i, card in enumerate(card_data):
        x_pos = str(280 + i * 300)
        
        # Card background
        ET.SubElement(svg, 'rect', {
            'x': x_pos, 'y': '160',
            'width': '280', 'height': '120',
            'fill': card['color'],
            'stroke': 'black',
            'stroke-width': '2'
        })
        
        # Card title
        card_title = ET.SubElement(svg, 'text', {
            'x': str(int(x_pos) + 20), 'y': '185',
            'font-family': 'Arial',
            'font-size': '14',
            'font-weight': 'bold',
            'fill': 'black'
        })
        card_title.text = card['title']
        
        # Card content area
        ET.SubElement(svg, 'rect', {
            'x': str(int(x_pos) + 20), 'y': '200',
            'width': '240', 'height': '60',
            'fill': 'white',
            'stroke': '#ccc',
            'stroke-width': '1'
        })
    
    # Quick Actions Section Title
    actions_title = ET.SubElement(svg, 'text', {
        'x': '280', 'y': '310',
        'font-family': 'Arial',
        'font-size': '18',
        'font-weight': 'bold',
        'fill': 'black'
    })
    actions_title.text = 'Quick Actions'
    
    # Quick Actions Container
    ET.SubElement(svg, 'rect', {
        'x': '280', 'y': '320',
        'width': '880', 'height': '200',
        'fill': '#f8f9fa',
        'stroke': 'black',
        'stroke-width': '2'
    })
    
    # Quick Action Buttons
    action_buttons = ['Create New User', 'Create New Project', 'View All Bugs']
    button_colors = ['#28a745', '#17a2b8', '#6f42c1']
    
    for i, button in enumerate(action_buttons):
        x_pos = str(320 + i * 280)
        
        ET.SubElement(svg, 'rect', {
            'x': x_pos, 'y': '380',
            'width': '200', 'height': '50',
            'fill': button_colors[i],
            'stroke': 'black',
            'stroke-width': '1'
        })
        
        button_text = ET.SubElement(svg, 'text', {
            'x': str(int(x_pos) + 100), 'y': '408',
            'font-family': 'Arial',
            'font-size': '12',
            'font-weight': 'bold',
            'fill': 'white',
            'text-anchor': 'middle'
        })
        button_text.text = button
    
    return ET.tostring(svg, encoding='unicode')

def create_tester_wireframe():
    """Create Tester Dashboard Wireframe"""
    svg = ET.Element('svg', {
        'width': '1200',
        'height': '800',
        'xmlns': 'http://www.w3.org/2000/svg'
    })
    
    # Background
    ET.SubElement(svg, 'rect', {
        'width': '1200',
        'height': '800',
        'fill': 'white',
        'stroke': 'none'
    })
    
    # Header
    ET.SubElement(svg, 'rect', {
        'x': '0', 'y': '0',
        'width': '1200', 'height': '60',
        'fill': '#f8f9fa',
        'stroke': 'black',
        'stroke-width': '2'
    })
    
    # Header Title
    title = ET.SubElement(svg, 'text', {
        'x': '20', 'y': '35',
        'font-family': 'Arial',
        'font-size': '16',
        'font-weight': 'bold',
        'fill': 'black'
    })
    title.text = 'Bug Tracker - Tester Dashboard'
    
    # User Info Button
    ET.SubElement(svg, 'rect', {
        'x': '1050', 'y': '15',
        'width': '80', 'height': '30',
        'fill': '#e9ecef',
        'stroke': 'black',
        'stroke-width': '1'
    })
    user_info = ET.SubElement(svg, 'text', {
        'x': '1070', 'y': '33',
        'font-family': 'Arial',
        'font-size': '12',
        'fill': 'black'
    })
    user_info.text = 'User Info'
    
    # Logout Button
    ET.SubElement(svg, 'rect', {
        'x': '1140', 'y': '15',
        'width': '50', 'height': '30',
        'fill': '#dc3545',
        'stroke': 'black',
        'stroke-width': '1'
    })
    logout = ET.SubElement(svg, 'text', {
        'x': '1155', 'y': '33',
        'font-family': 'Arial',
        'font-size': '12',
        'fill': 'white'
    })
    logout.text = 'Logout'
    
    # Sidebar Navigation
    ET.SubElement(svg, 'rect', {
        'x': '0', 'y': '60',
        'width': '250', 'height': '740',
        'fill': '#f1f3f4',
        'stroke': 'black',
        'stroke-width': '2'
    })
    
    nav_title = ET.SubElement(svg, 'text', {
        'x': '20', 'y': '90',
        'font-family': 'Arial',
        'font-size': '16',
        'font-weight': 'bold',
        'fill': 'black'
    })
    nav_title.text = 'Navigation'
    
    # Navigation Menu Items
    nav_items = ['Dashboard', 'Report Bug', 'My Bugs']
    for i, item in enumerate(nav_items):
        y_pos = str(110 + i * 50)
        fill_color = '#007bff' if i == 0 else '#ffffff'
        text_color = 'white' if i == 0 else 'black'
        
        ET.SubElement(svg, 'rect', {
            'x': '20', 'y': y_pos,
            'width': '210', 'height': '40',
            'fill': fill_color,
            'stroke': 'black',
            'stroke-width': '1'
        })
        
        nav_text = ET.SubElement(svg, 'text', {
            'x': '30', 'y': str(int(y_pos) + 25),
            'font-family': 'Arial',
            'font-size': '14',
            'fill': text_color
        })
        nav_text.text = item
    
    # Main Content Area
    ET.SubElement(svg, 'rect', {
        'x': '250', 'y': '60',
        'width': '950', 'height': '740',
        'fill': '#ffffff',
        'stroke': 'black',
        'stroke-width': '2'
    })
    
    # Breadcrumb
    ET.SubElement(svg, 'rect', {
        'x': '270', 'y': '80',
        'width': '910', 'height': '30',
        'fill': '#f8f9fa',
        'stroke': 'black',
        'stroke-width': '1'
    })
    breadcrumb = ET.SubElement(svg, 'text', {
        'x': '280', 'y': '98',
        'font-family': 'Arial',
        'font-size': '12',
        'fill': 'black'
    })
    breadcrumb.text = 'Home > Dashboard'
    
    # Personal Statistics Title
    stats_title = ET.SubElement(svg, 'text', {
        'x': '280', 'y': '140',
        'font-family': 'Arial',
        'font-size': '18',
        'font-weight': 'bold',
        'fill': 'black'
    })
    stats_title.text = 'Personal Statistics'
    
    # Personal Statistics Cards
    card_data = [
        {'title': 'Bugs Reported by Me', 'color': '#e8f5e8'},
        {'title': 'Bug Status Breakdown', 'color': '#fff3e0'}
    ]
    
    for i, card in enumerate(card_data):
        x_pos = str(280 + i * 440)
        
        # Card background
        ET.SubElement(svg, 'rect', {
            'x': x_pos, 'y': '160',
            'width': '400', 'height': '120',
            'fill': card['color'],
            'stroke': 'black',
            'stroke-width': '2'
        })
        
        # Card title
        card_title = ET.SubElement(svg, 'text', {
            'x': str(int(x_pos) + 20), 'y': '185',
            'font-family': 'Arial',
            'font-size': '14',
            'font-weight': 'bold',
            'fill': 'black'
        })
        card_title.text = card['title']
        
        # Card content area
        ET.SubElement(svg, 'rect', {
            'x': str(int(x_pos) + 20), 'y': '200',
            'width': '360', 'height': '60',
            'fill': 'white',
            'stroke': '#ccc',
            'stroke-width': '1'
        })
    
    # Quick Actions Section Title
    actions_title = ET.SubElement(svg, 'text', {
        'x': '280', 'y': '310',
        'font-family': 'Arial',
        'font-size': '18',
        'font-weight': 'bold',
        'fill': 'black'
    })
    actions_title.text = 'Quick Actions'
    
    # Quick Actions Container
    ET.SubElement(svg, 'rect', {
        'x': '280', 'y': '320',
        'width': '880', 'height': '200',
        'fill': '#f8f9fa',
        'stroke': 'black',
        'stroke-width': '2'
    })
    
    # Quick Action Buttons
    action_buttons = ['Report New Bug', 'View My Bugs']
    button_colors = ['#28a745', '#17a2b8']
    
    for i, button in enumerate(action_buttons):
        x_pos = str(400 + i * 300)
        
        ET.SubElement(svg, 'rect', {
            'x': x_pos, 'y': '380',
            'width': '200', 'height': '50',
            'fill': button_colors[i],
            'stroke': 'black',
            'stroke-width': '1'
        })
        
        button_text = ET.SubElement(svg, 'text', {
            'x': str(int(x_pos) + 100), 'y': '408',
            'font-family': 'Arial',
            'font-size': '12',
            'font-weight': 'bold',
            'fill': 'white',
            'text-anchor': 'middle'
        })
        button_text.text = button
    
    return ET.tostring(svg, encoding='unicode')

def create_developer_wireframe():
    """Create Developer Dashboard Wireframe"""
    svg = ET.Element('svg', {
        'width': '1200',
        'height': '800',
        'xmlns': 'http://www.w3.org/2000/svg'
    })
    
    # Background
    ET.SubElement(svg, 'rect', {
        'width': '1200',
        'height': '800',
        'fill': 'white',
        'stroke': 'none'
    })
    
    # Header
    ET.SubElement(svg, 'rect', {
        'x': '0', 'y': '0',
        'width': '1200', 'height': '60',
        'fill': '#f8f9fa',
        'stroke': 'black',
        'stroke-width': '2'
    })
    
    # Header Title
    title = ET.SubElement(svg, 'text', {
        'x': '20', 'y': '35',
        'font-family': 'Arial',
        'font-size': '16',
        'font-weight': 'bold',
        'fill': 'black'
    })
    title.text = 'Bug Tracker - Developer Dashboard'
    
    # User Info Button
    ET.SubElement(svg, 'rect', {
        'x': '1050', 'y': '15',
        'width': '80', 'height': '30',
        'fill': '#e9ecef',
        'stroke': 'black',
        'stroke-width': '1'
    })
    user_info = ET.SubElement(svg, 'text', {
        'x': '1070', 'y': '33',
        'font-family': 'Arial',
        'font-size': '12',
        'fill': 'black'
    })
    user_info.text = 'User Info'
    
    # Logout Button
    ET.SubElement(svg, 'rect', {
        'x': '1140', 'y': '15',
        'width': '50', 'height': '30',
        'fill': '#dc3545',
        'stroke': 'black',
        'stroke-width': '1'
    })
    logout = ET.SubElement(svg, 'text', {
        'x': '1155', 'y': '33',
        'font-family': 'Arial',
        'font-size': '12',
        'fill': 'white'
    })
    logout.text = 'Logout'
    
    # Sidebar Navigation
    ET.SubElement(svg, 'rect', {
        'x': '0', 'y': '60',
        'width': '250', 'height': '740',
        'fill': '#f1f3f4',
        'stroke': 'black',
        'stroke-width': '2'
    })
    
    nav_title = ET.SubElement(svg, 'text', {
        'x': '20', 'y': '90',
        'font-family': 'Arial',
        'font-size': '16',
        'font-weight': 'bold',
        'fill': 'black'
    })
    nav_title.text = 'Navigation'
    
    # Navigation Menu Items
    nav_items = ['Dashboard', 'Assigned Bugs', 'Work History']
    for i, item in enumerate(nav_items):
        y_pos = str(110 + i * 50)
        fill_color = '#007bff' if i == 0 else '#ffffff'
        text_color = 'white' if i == 0 else 'black'
        
        ET.SubElement(svg, 'rect', {
            'x': '20', 'y': y_pos,
            'width': '210', 'height': '40',
            'fill': fill_color,
            'stroke': 'black',
            'stroke-width': '1'
        })
        
        nav_text = ET.SubElement(svg, 'text', {
            'x': '30', 'y': str(int(y_pos) + 25),
            'font-family': 'Arial',
            'font-size': '14',
            'fill': text_color
        })
        nav_text.text = item
    
    # Main Content Area
    ET.SubElement(svg, 'rect', {
        'x': '250', 'y': '60',
        'width': '950', 'height': '740',
        'fill': '#ffffff',
        'stroke': 'black',
        'stroke-width': '2'
    })
    
    # Breadcrumb
    ET.SubElement(svg, 'rect', {
        'x': '270', 'y': '80',
        'width': '910', 'height': '30',
        'fill': '#f8f9fa',
        'stroke': 'black',
        'stroke-width': '1'
    })
    breadcrumb = ET.SubElement(svg, 'text', {
        'x': '280', 'y': '98',
        'font-family': 'Arial',
        'font-size': '12',
        'fill': 'black'
    })
    breadcrumb.text = 'Home > Dashboard'
    
    # Work Queue Statistics Title
    stats_title = ET.SubElement(svg, 'text', {
        'x': '280', 'y': '140',
        'font-family': 'Arial',
        'font-size': '18',
        'font-weight': 'bold',
        'fill': 'black'
    })
    stats_title.text = 'Work Queue Statistics'
    
    # Work Queue Statistics Cards
    card_data = [
        {'title': 'Assigned Bugs Count', 'color': '#ffe6e6'},
        {'title': 'Priority Breakdown', 'color': '#e6f3ff'}
    ]
    
    for i, card in enumerate(card_data):
        x_pos = str(280 + i * 440)
        
        # Card background
        ET.SubElement(svg, 'rect', {
            'x': x_pos, 'y': '160',
            'width': '400', 'height': '120',
            'fill': card['color'],
            'stroke': 'black',
            'stroke-width': '2'
        })
        
        # Card title
        card_title = ET.SubElement(svg, 'text', {
            'x': str(int(x_pos) + 20), 'y': '185',
            'font-family': 'Arial',
            'font-size': '14',
            'font-weight': 'bold',
            'fill': 'black'
        })
        card_title.text = card['title']
        
        # Card content area
        ET.SubElement(svg, 'rect', {
            'x': str(int(x_pos) + 20), 'y': '200',
            'width': '360', 'height': '60',
            'fill': 'white',
            'stroke': '#ccc',
            'stroke-width': '1'
        })
    
    # Quick Actions Section Title
    actions_title = ET.SubElement(svg, 'text', {
        'x': '280', 'y': '310',
        'font-family': 'Arial',
        'font-size': '18',
        'font-weight': 'bold',
        'fill': 'black'
    })
    actions_title.text = 'Quick Actions'
    
    # Quick Actions Container
    ET.SubElement(svg, 'rect', {
        'x': '280', 'y': '320',
        'width': '880', 'height': '200',
        'fill': '#f8f9fa',
        'stroke': 'black',
        'stroke-width': '2'
    })
    
    # Quick Action Buttons
    action_buttons = ['View Assigned Bugs', 'Update Bug Status']
    button_colors = ['#fd7e14', '#6f42c1']
    
    for i, button in enumerate(action_buttons):
        x_pos = str(400 + i * 300)
        
        ET.SubElement(svg, 'rect', {
            'x': x_pos, 'y': '380',
            'width': '200', 'height': '50',
            'fill': button_colors[i],
            'stroke': 'black',
            'stroke-width': '1'
        })
        
        button_text = ET.SubElement(svg, 'text', {
            'x': str(int(x_pos) + 100), 'y': '408',
            'font-family': 'Arial',
            'font-size': '12',
            'font-weight': 'bold',
            'fill': 'white',
            'text-anchor': 'middle'
        })
        button_text.text = button
    
    # Additional section for current work
    current_work_title = ET.SubElement(svg, 'text', {
        'x': '280', 'y': '570',
        'font-family': 'Arial',
        'font-size': '18',
        'font-weight': 'bold',
        'fill': 'black'
    })
    current_work_title.text = 'Current Work'
    
    # Current work container
    ET.SubElement(svg, 'rect', {
        'x': '280', 'y': '580',
        'width': '880', 'height': '180',
        'fill': '#f0f8ff',
        'stroke': 'black',
        'stroke-width': '2'
    })
    
    # Priority indicators
    priority_colors = ['#dc3545', '#fd7e14', '#ffc107', '#007bff']
    priority_labels = ['Critical', 'High', 'Medium', 'Low']
    
    for i, (color, label) in enumerate(zip(priority_colors, priority_labels)):
        x_pos = str(320 + i * 200)
        
        # Priority indicator
        ET.SubElement(svg, 'rect', {
            'x': x_pos, 'y': '620',
            'width': '150', 'height': '30',
            'fill': color,
            'stroke': 'black',
            'stroke-width': '1'
        })
        
        priority_text = ET.SubElement(svg, 'text', {
            'x': str(int(x_pos) + 75), 'y': '638',
            'font-family': 'Arial',
            'font-size': '12',
            'font-weight': 'bold',
            'fill': 'white',
            'text-anchor': 'middle'
        })
        priority_text.text = f'{label} Priority'
    
    return ET.tostring(svg, encoding='unicode')

def create_public_bug_report_wireframe():
    """Create Public Bug Report Page Wireframe"""
    svg = ET.Element('svg', {
        'width': '1200',
        'height': '900',
        'xmlns': 'http://www.w3.org/2000/svg'
    })
    
    # Background
    ET.SubElement(svg, 'rect', {
        'width': '1200',
        'height': '900',
        'fill': 'white',
        'stroke': 'none'
    })
    
    # Header
    ET.SubElement(svg, 'rect', {
        'x': '0', 'y': '0',
        'width': '1200', 'height': '80',
        'fill': '#f8f9fa',
        'stroke': 'black',
        'stroke-width': '2'
    })
    
    # Header Title
    title = ET.SubElement(svg, 'text', {
        'x': '20', 'y': '35',
        'font-family': 'Arial',
        'font-size': '20',
        'font-weight': 'bold',
        'fill': 'black'
    })
    title.text = 'XYZ Corp Bug Tracker'
    
    # Subtitle
    subtitle = ET.SubElement(svg, 'text', {
        'x': '20', 'y': '55',
        'font-family': 'Arial',
        'font-size': '14',
        'fill': '#666'
    })
    subtitle.text = 'Public Bug Report Form'
    
    # Back to Home Button
    ET.SubElement(svg, 'rect', {
        'x': '1050', 'y': '25',
        'width': '120', 'height': '30',
        'fill': '#6c757d',
        'stroke': 'black',
        'stroke-width': '1'
    })
    back_btn = ET.SubElement(svg, 'text', {
        'x': '1110', 'y': '43',
        'font-family': 'Arial',
        'font-size': '12',
        'font-weight': 'bold',
        'fill': 'white',
        'text-anchor': 'middle'
    })
    back_btn.text = 'Back to Home'
    
    # Main Container
    ET.SubElement(svg, 'rect', {
        'x': '100', 'y': '120',
        'width': '1000', 'height': '720',
        'fill': '#ffffff',
        'stroke': 'black',
        'stroke-width': '2'
    })
    
    # Form Title
    form_title = ET.SubElement(svg, 'text', {
        'x': '120', 'y': '160',
        'font-family': 'Arial',
        'font-size': '24',
        'font-weight': 'bold',
        'fill': 'black'
    })
    form_title.text = 'Report a Bug'
    
    # Form Description
    form_desc = ET.SubElement(svg, 'text', {
        'x': '120', 'y': '185',
        'font-family': 'Arial',
        'font-size': '14',
        'fill': '#666'
    })
    form_desc.text = 'Help us improve our software by reporting bugs you encounter'
    
    # Form Fields Container
    ET.SubElement(svg, 'rect', {
        'x': '120', 'y': '210',
        'width': '960', 'height': '500',
        'fill': '#f8f9fa',
        'stroke': '#ddd',
        'stroke-width': '1'
    })
    
    # Project Selection
    project_label = ET.SubElement(svg, 'text', {
        'x': '140', 'y': '240',
        'font-family': 'Arial',
        'font-size': '14',
        'font-weight': 'bold',
        'fill': 'black'
    })
    project_label.text = 'Project *'
    
    ET.SubElement(svg, 'rect', {
        'x': '140', 'y': '250',
        'width': '400', 'height': '35',
        'fill': 'white',
        'stroke': '#ccc',
        'stroke-width': '1'
    })
    
    project_placeholder = ET.SubElement(svg, 'text', {
        'x': '150', 'y': '270',
        'font-family': 'Arial',
        'font-size': '12',
        'fill': '#999'
    })
    project_placeholder.text = 'Select a project...'
    
    # Bug Title
    title_label = ET.SubElement(svg, 'text', {
        'x': '580', 'y': '240',
        'font-family': 'Arial',
        'font-size': '14',
        'font-weight': 'bold',
        'fill': 'black'
    })
    title_label.text = 'Bug Title *'
    
    ET.SubElement(svg, 'rect', {
        'x': '580', 'y': '250',
        'width': '480', 'height': '35',
        'fill': 'white',
        'stroke': '#ccc',
        'stroke-width': '1'
    })
    
    title_placeholder = ET.SubElement(svg, 'text', {
        'x': '590', 'y': '270',
        'font-family': 'Arial',
        'font-size': '12',
        'fill': '#999'
    })
    title_placeholder.text = 'Brief description of the bug...'
    
    # Bug Description
    desc_label = ET.SubElement(svg, 'text', {
        'x': '140', 'y': '320',
        'font-family': 'Arial',
        'font-size': '14',
        'font-weight': 'bold',
        'fill': 'black'
    })
    desc_label.text = 'Bug Description *'
    
    ET.SubElement(svg, 'rect', {
        'x': '140', 'y': '330',
        'width': '920', 'height': '100',
        'fill': 'white',
        'stroke': '#ccc',
        'stroke-width': '1'
    })
    
    desc_placeholder = ET.SubElement(svg, 'text', {
        'x': '150', 'y': '350',
        'font-family': 'Arial',
        'font-size': '12',
        'fill': '#999'
    })
    desc_placeholder.text = 'Detailed description of the bug, steps to reproduce, expected vs actual behavior...'
    
    # Priority Selection
    priority_label = ET.SubElement(svg, 'text', {
        'x': '140', 'y': '470',
        'font-family': 'Arial',
        'font-size': '14',
        'font-weight': 'bold',
        'fill': 'black'
    })
    priority_label.text = 'Priority Level'
    
    # Priority Options
    priority_options = [
        {'label': 'Low', 'color': '#007bff'},
        {'label': 'Medium', 'color': '#ffc107'},
        {'label': 'High', 'color': '#fd7e14'},
        {'label': 'Critical', 'color': '#dc3545'}
    ]
    
    for i, option in enumerate(priority_options):
        x_pos = str(140 + i * 220)
        
        # Radio button
        ET.SubElement(svg, 'circle', {
            'cx': str(int(x_pos) + 10),
            'cy': '495',
            'r': '8',
            'fill': 'white',
            'stroke': option['color'],
            'stroke-width': '2'
        })
        
        # Priority label with color
        ET.SubElement(svg, 'rect', {
            'x': str(int(x_pos) + 25),
            'y': '485',
            'width': '80',
            'height': '20',
            'fill': option['color'],
            'stroke': 'none'
        })
        
        priority_text = ET.SubElement(svg, 'text', {
            'x': str(int(x_pos) + 65),
            'y': '497',
            'font-family': 'Arial',
            'font-size': '12',
            'font-weight': 'bold',
            'fill': 'white',
            'text-anchor': 'middle'
        })
        priority_text.text = option['label']
    
    # Reporter Information Section
    reporter_title = ET.SubElement(svg, 'text', {
        'x': '140', 'y': '550',
        'font-family': 'Arial',
        'font-size': '16',
        'font-weight': 'bold',
        'fill': 'black'
    })
    reporter_title.text = 'Reporter Information (Optional)'
    
    # Reporter Name
    name_label = ET.SubElement(svg, 'text', {
        'x': '140', 'y': '580',
        'font-family': 'Arial',
        'font-size': '14',
        'font-weight': 'bold',
        'fill': 'black'
    })
    name_label.text = 'Your Name'
    
    ET.SubElement(svg, 'rect', {
        'x': '140', 'y': '590',
        'width': '400', 'height': '35',
        'fill': 'white',
        'stroke': '#ccc',
        'stroke-width': '1'
    })
    
    name_placeholder = ET.SubElement(svg, 'text', {
        'x': '150', 'y': '610',
        'font-family': 'Arial',
        'font-size': '12',
        'fill': '#999'
    })
    name_placeholder.text = 'Enter your name (optional)...'
    
    # Reporter Email
    email_label = ET.SubElement(svg, 'text', {
        'x': '580', 'y': '580',
        'font-family': 'Arial',
        'font-size': '14',
        'font-weight': 'bold',
        'fill': 'black'
    })
    email_label.text = 'Your Email'
    
    ET.SubElement(svg, 'rect', {
        'x': '580', 'y': '590',
        'width': '480', 'height': '35',
        'fill': 'white',
        'stroke': '#ccc',
        'stroke-width': '1'
    })
    
    email_placeholder = ET.SubElement(svg, 'text', {
        'x': '590', 'y': '610',
        'font-family': 'Arial',
        'font-size': '12',
        'fill': '#999'
    })
    email_placeholder.text = 'Enter your email for updates (optional)...'
    
    # Form Validation Note
    validation_note = ET.SubElement(svg, 'text', {
        'x': '140', 'y': '660',
        'font-family': 'Arial',
        'font-size': '12',
        'fill': '#dc3545'
    })
    validation_note.text = '* Required fields'
    
    # Action Buttons
    # Submit Button
    ET.SubElement(svg, 'rect', {
        'x': '140', 'y': '680',
        'width': '150', 'height': '45',
        'fill': '#28a745',
        'stroke': 'black',
        'stroke-width': '1'
    })
    
    submit_text = ET.SubElement(svg, 'text', {
        'x': '215', 'y': '706',
        'font-family': 'Arial',
        'font-size': '14',
        'font-weight': 'bold',
        'fill': 'white',
        'text-anchor': 'middle'
    })
    submit_text.text = 'Submit Bug Report'
    
    # Clear Form Button
    ET.SubElement(svg, 'rect', {
        'x': '310', 'y': '680',
        'width': '120', 'height': '45',
        'fill': '#6c757d',
        'stroke': 'black',
        'stroke-width': '1'
    })
    
    clear_text = ET.SubElement(svg, 'text', {
        'x': '370', 'y': '706',
        'font-family': 'Arial',
        'font-size': '14',
        'font-weight': 'bold',
        'fill': 'white',
        'text-anchor': 'middle'
    })
    clear_text.text = 'Clear Form'
    
    # Success Message Area (placeholder)
    ET.SubElement(svg, 'rect', {
        'x': '120', 'y': '750',
        'width': '960', 'height': '60',
        'fill': '#d4edda',
        'stroke': '#c3e6cb',
        'stroke-width': '1',
        'stroke-dasharray': '5,5'
    })
    
    success_title = ET.SubElement(svg, 'text', {
        'x': '140', 'y': '775',
        'font-family': 'Arial',
        'font-size': '14',
        'font-weight': 'bold',
        'fill': '#155724'
    })
    success_title.text = 'Success Confirmation Area'
    
    success_desc = ET.SubElement(svg, 'text', {
        'x': '140', 'y': '795',
        'font-family': 'Arial',
        'font-size': '12',
        'fill': '#155724'
    })
    success_desc.text = 'Bug report submitted successfully! Bug ID: #12345 | Option to report another bug'
    
    return ET.tostring(svg, encoding='unicode')

def main():
    """Generate all wireframes"""
    
    # Create Admin Dashboard Wireframe
    admin_svg = create_admin_wireframe()
    with open('admin-dashboard-wireframe.svg', 'w', encoding='utf-8') as f:
        f.write(admin_svg)
    print("Created admin-dashboard-wireframe.svg")
    
    # Create Tester Dashboard Wireframe
    tester_svg = create_tester_wireframe()
    with open('tester-dashboard-wireframe.svg', 'w', encoding='utf-8') as f:
        f.write(tester_svg)
    print("Created tester-dashboard-wireframe.svg")
    
    # Create Developer Dashboard Wireframe
    developer_svg = create_developer_wireframe()
    with open('developer-dashboard-wireframe.svg', 'w', encoding='utf-8') as f:
        f.write(developer_svg)
    print("Created developer-dashboard-wireframe.svg")
    
    # Create Public Bug Report Wireframe
    public_bug_report_svg = create_public_bug_report_wireframe()
    with open('public-bug-report-wireframe.svg', 'w', encoding='utf-8') as f:
        f.write(public_bug_report_svg)
    print("Created public-bug-report-wireframe.svg")

if __name__ == "__main__":
    main()

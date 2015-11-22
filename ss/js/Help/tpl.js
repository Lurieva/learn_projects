var editTpl = '<label>Name:</label><input type="text" name="name" value=<%=name%>><br>'+
    '<label>Lastname:</label><input type="text" name="lastName" value=<%=lastName%>><br>'+
    '<label>Age:</label><input type="number" name="age" value=<%=age%>><br>'+
    '<label>Gender:</label><input type="text" name="gender" value=<%=gender%>><br>'+
    '<label>Skype:</label><input type="text" name="skype" value=<%=skype%>><br>'+
    '<div id="preview" class="btn">Preview</div><div id="save" class="btn">Save</div>',

    previewTpl = '<ul><label>Name:</label><li><%=name%></li><br>' +
    '<label>lastName:</label><li><%=lastName%></li><br>' + 
    '<label>Age:</label><li><%=age%></li><br>' +
    '<label>Gender:</label><li><%=gender%></li><br>' + 
    '<label>Skype:</label><li><%=skype%></li></ul>' +
    '<div id="edit" class="btn">Edit</div>',

    tableHeaderTpl = '<tr><th>Name</th><th>LastName</th><th>Gender</th><th></th></tr>',

    tableStringTpl = '<td><%=name%></td><td><%=lastName%></td><td><%=gender%></td>' + 
    '<td class="button input">More</td>';
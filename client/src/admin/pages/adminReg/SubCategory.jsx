import React from 'react'
const handleSubmit = () => {
    
}
function SubCategory() {
  return (
    <div>
          <h1 align="center">Sub Category</h1>
        <table border={2} align='center'>
                <tr>
                    <td>Category</td>
                    <td>
                        <select name="sel-categor">
                            <option>--select--</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Subcategory</td>
                    <td><input type="text" name="" id="" /></td>
                </tr>
                 <tr>
                    <td>Photo</td>
                    <td><input type="file" name="file_photo" id=""/></td>
                </tr>
                <tr>
                    <td colSpan={2} align='center'><input type="button" value="Register" onClick={handleSubmit} /></td>
                </tr>
            </table>
    </div>
  )
}

export default SubCategory
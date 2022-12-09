# J-rgen_Skjegstad_sp1


The location of the files for this project:
https://github.com/jorgen228/J-rgen_Skjegstad_sp1

To run the application, some installations are needed. 
The downloaded file of jQuery version 3.6.0 is needed to run the application.
Let the jQuery file sit at the bottom of the body tag, above the regula linked JavaScript file.
This could be solved by linking the file from the web, but i recommend linking it lokally from the code-editor.

For Bootstrap I reccoment the same.
The Bootstrap innstallations, in this order, are:
  bootstrap-5.0.2-dist/css/bootstrap.css
  bootstrap-5.0.2-dist/css/bootstrap-grid.min.css
  bootstrap-5.0.2-dist/css/bootstrap-grid.rtl.css
  bootstrap-5.0.2-dist/css/bootstrap-grid.rtl.min.css
Let these links all sit in the head section.

Finalliy, link the bootsrap icons from the web trough the following url:
  https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.9.1/font/bootstrap-icons.css
  
This will allow the application to run propperly.

How the application works:
1. Allow the employees to fully load before selecting one of them. 
2. Selected one or more employees by clicking their according image.
3. To clear out your selection if you clicked wrong, simply tap the "in" button.
4. After selecting the correct employees, click "out" and enter their leave in minutes.
5. When the employee returns to the office, select the correct employee from the table and click "in".

Delivery Functionality:
1. Enter the proper information from the delivery driver in the table. Make shure to select their type of vehicle.
2. Click "add" to add the delivery to the table of current deliveries. 
3. When the driver returns, select the correct row in the delivery-table, and click "clear" to remove it from the list.

The application will automatically let you know when an employee has been away past their expected time, or the delivery has taken longer than expected.

  



var i=0;

  function cloneForm(){
    // var i=0;
    var myForm = document.getElementById('personForm');
			var myClone = myForm.cloneNode(true);
      myClone.id = i;

			var parentForm =document.getElementById('myForm')
      // parentForm.appendChild(myClone);
      parentForm.insertBefore(myClone, document.getElementById('buttonGroup'));//personForm'));
      i++;

  }

  function addTable() {

      var userArray1=[];
       var xhttp = new XMLHttpRequest();
       xhttp.open("GET", "/data/users.json", false); //false because rest of code must wait to recieve array
      xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4) {
              if(xhttp.status == 200) {
                // alert(xhttp.responseText);
                  userArray1 = JSON.parse(xhttp.responseText);
                  var name = userArray1[0].fName;
                  // alert(name);
               }
          }
          else if (xhttp.status == 400) {
              // Some other error
              console.error("Error Getting JSON");
          }
      };
      xhttp.send();

      // var userArray2 = getUsers();
      var numUsers = userArray1.length;

      var boxID = 0;
      var table;
      var myTable = document.getElementById("myTable");

        table = document.createElement('TABLE');
        table.border='1';
        table.id = "table";

      var tableBody = document.createElement('TBODY');
      table.appendChild(tableBody);

      var header = table.createTHead();
      var row = header.insertRow(0);

      //create top row
      for (var i=0; i< 5; i++){
        var cell = row.insertCell(-1);
        cell.width = '100';

        if(i ===0){
          cell.setAttribute('style', 'text-align:center;');
          cell.innerHTML = "<b>"+ "First Name" +"</b>";
        }
        if(i ===1){
          cell.setAttribute('style', 'text-align:center;');
          cell.innerHTML = "<b>"+ "Last Name" + "</b>";
        }
        if(i ===2){
          cell.setAttribute('style', 'text-align:center;');
          cell.innerHTML = "<b>"+ "Birthday" + "</b>";
        }
        if(i ===3){
          cell.setAttribute('style', 'text-align:center;');
          cell.innerHTML = "<b>"+ "Email" + "</b>";
        }
        if(i ===4){
          cell.setAttribute('style', 'text-align:center;');
          cell.innerHTML = "<b>"+ "Gender" + "</b>";
        }

      }

      for (var i=0; i< numUsers; i++){
         var tr = document.createElement('TR');

         tableBody.appendChild(tr);
         var numFields= Object.keys(userArray1[i]).length

         for (var j=0; j< 5; j++){
             var td = document.createElement('TD');
             td.width='100';
             td.height='50';

            if(j === 0){
              td.innerHTML = userArray1[i].fName;
            }
            if(j === 1){
              td.innerHTML = userArray1[i].lName;
            }
            if(j === 2){
              td.innerHTML = userArray1[i].bday;
            }
            if(j === 3){
              td.innerHTML = userArray1[i].email;
            }
            if(j === 4){
              td.innerHTML = userArray1[i].gender;
            }

             // alert("Just before object access");

             // var name = userArray1[0].fName;
             // var object = userArray2[i];
             // alert(object[0].toString());
             if(numFields >5 && j === 3){
               td.innerHTML = userArray1[i].fName;
             }
            // td.innerHTML = userArray1[i].fName;

             tr.appendChild(td);
             table.appendChild(tr);
         }
      }
      myTable.appendChild(table);

  }

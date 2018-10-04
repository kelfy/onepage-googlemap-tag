<?php

class TagMapper extends Mapper
{
    

    //get tag
    public function getTag(){
        check_is_ajax(__FILE__);
        $sql = "SELECT fname,lat,lng FROM tag";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute();
        if($result){
            while($row = $stmt->fetch()) {
                $results[] = $row;
            }
            $display = json_encode($results);

            echo $display;
        }

    }    
    //save tag
    public function saveTag($data){


        // check against email first. If duplicate found, reject
        
        $check_data_sql = "SELECT COUNT(*) FROM tag WHERE  email='".$data['email']."'";
        $check_stmt = $this->db->prepare($check_data_sql);
        $check_result = $check_stmt->execute();

        $red = $check_stmt->rowCount();
        
        //$row = $check_result->fetch_row();
        //$rowcount = $check_result->rowCount();

        if ($check_stmt->fetchColumn() >= 2){
            
            $return = array (
                'status' => 'over'
            );


            return json_encode($return, JSON_PRETTY_PRINT);
        }else{

        
        $sql = "INSERT INTO tag (fname, lname, email, phone, lat, lng, date) VALUES ('".$data['fname']."','".$data['lname']."','".$data['email']."','".$data['phone']."','".$data['lat']."','".$data['lng']."','".date("Y-m-d H:i:s")."')";
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute();
            if($result){
                $return = array (
                    'status' => 'success',
                    'id' => $this->db->lastInsertId()
                );

                return json_encode($return, JSON_PRETTY_PRINT);
            }
        

        }

    }

    //remove tag
    public function removeTag($id){
        check_is_ajax(__FILE__);
        $sql = "DELETE from tag where id=".$id;
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute();
        return $result;

    }

    public function getBeachList(){
        $sql = "SELECT * FROM beaches ORDER BY name ASC";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll();
        return $result;
    }


   

}

function check_is_ajax($script) {
    $isAjax = isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND
    strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
    if(!$isAjax) {
      trigger_error('Access denied');
       die; 
    }
  }
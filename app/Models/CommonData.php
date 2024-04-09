<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommonData extends Model
{
    public $id;
    public $username;
    public $email;
    //public $firstName;
    //public $lastName;
    public $roles = [];


    public static function getCommonData(): CommonData
    {
        $user = UsersModel::getCurrent();

        $common_data = new CommonData();

        $common_data->roles[] = $user ? $user->getUserRole() : '';
        $common_data->username = $user ? $user->getUserName() : '';
        $common_data->email = $user ? $user->getEmail() : '';
        $common_data->id = $user ? $user->getUserId() : null;

        // dd($common_data);
        return $common_data;
    }
}

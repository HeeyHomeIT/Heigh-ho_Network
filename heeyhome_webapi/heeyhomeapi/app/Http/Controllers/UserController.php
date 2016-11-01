<?php
//UsersController
namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;

class UserController extends BaseController
{

    public function index()
    {
        return User::all();
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        // 数组形式
        return $this->response->array($user->toArray());
    }
}
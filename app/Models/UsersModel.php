<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class UsersModel extends Model
{
  public $role;
  public $user_name;
  public $email;
  public $id;


  public function __construct(array $args = [])
  {
    parent::__construct();
    $this->role = $args['role'] ?? null;
    $this->user_name = $args['user_name'] ?? null;
    $this->email = $args['email'] ?? null;
    $this->id = $args['id'] ?? null;
  }

  protected $table = "user";

  public $timestamps = false;

  protected $fillable = [
    'id',
    'email',
    'name',
    'address',
    'role'
  ];

  protected $hidden = [
    'password'
  ];

  use HasFactory;

  public static function login(string $login, string $password, ?string $captcha_response = null): bool
  {
    //$user = UsersModel::findOrFail($id);
    $response = DB::table('user')
      ->where('name', $login)
      ->where('password', $password)
      ->first();


    if (isset($response)) {

      $user = new UsersModel([
        'role' => $response->role,
        'user_name' => $response->name,
        'email' => $response->email,
        'id' => $response->id,
      ]);


      UsersModel::setCurrent($user);

      //LogFacade::login($user->login);

      return true;
    } else {
      return false;
    }
  }

  public static function getCurrent(): ?UsersModel
  {
      return session('current_user');
  }

  public static function setCurrent(UsersModel $user): void
  {
    session()->put('current_user', $user);
  }

  public function getUserRole(): string
  {
    return ($this->role);
  }

  public function getUserName(): string
  {
    return ($this->user_name);
  }

  public function getEmail(): string
  {
    return ($this->email);
  }

  public function getUserId(): int
  {
    return (int)($this->id);
  }

}

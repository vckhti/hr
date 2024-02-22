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

  public static $temp_username;
  public static $temp_role;
  public static $temp_email;
  public static $temp_id;

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

    // Checking credentials in billing
//    $response = OracleFacade::procedure(
//      'begin issa.ui_login_k(:login, :password, :cursor); end;',
//      [
//        ':login' => ['value' => $login],
//        ':password' => ['value' => $password],
//      ]
//    )->first();

    //$user = UsersModel::findOrFail($id);
    $response = DB::table('user')
      ->where('name', $login)
      ->where('password', $password)
      ->first();

    //dd($response->name);

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
    if (self::$temp_role && self::$temp_username && self::$temp_email && self::$temp_id ) {
      $user = new UsersModel();

      $user->role = self::$temp_role;
      $user->user_name = self::$temp_username;
      $user->email = self::$temp_email;
      $user->id = self::$temp_id;

      return $user;
    } else {
      return null;
    }

  }

  public static function setCurrent(UsersModel $user): void
  {
    self::$temp_role = $user->getUserRole();
    self::$temp_username = $user->getUserName();
    self::$temp_email = $user->getEmail();
    self::$temp_id = $user->getUserId();
    //session()->put('current_user', $user);
  }

  public function getUserRole(): string
  {
    return ($this->role) ?? 'admin';
  }

  public function getUserName(): string
  {
    return ($this->user_name);
  }

  public function getEmail(): string
  {
    return ($this->email) ?? 'marimonov@mail.ru';
  }

  public function getUserId(): int
  {
    return (int)($this->id);
  }

}

<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
        'status',
        'account_number',
        'avatar'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_admin' => 'boolean',
    ];

    public function branches()
    {
        return $this->belongsToMany(Branch::class, 'user_branch');
    }

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::created(function (User $user) {
            $user->account_number = User::generateAccountNumber($user->id);
            $user->avatar = env('APP_URL') . '/avatar.png';
            $user->profile()->save(new Profile());
            $user->save();
        });
    }

    public static function generateAccountNumber(int $input): string
    {
        return str_pad($input, 12, "0", STR_PAD_LEFT);
    }

    public function getPersonalAccessToken()
    {
        $tokenResult = $this->createToken('Personal Access Token');

        $token = $tokenResult->plainTextToken;

        return $token;
    }
}

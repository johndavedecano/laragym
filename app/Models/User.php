<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\ForgotPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $appends = ['initial'];

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

    public function getInitialAttribute()
    {
        $words = explode(' ', $this->name);
        return mb_strtoupper(
            mb_substr($words[0], 0, 1, 'UTF-8') .
            mb_substr(end($words), 0, 1, 'UTF-8'),
            'UTF-8'
        );
    }

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ForgotPassword($token));
    }
}
